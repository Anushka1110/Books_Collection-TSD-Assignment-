import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import {Link,useNavigate} from 'react-router-dom'

import './index.css'

const LoginForm =()=>{
  const navigate = useNavigate()

  const token = Cookies.get("jwt_token")

  const [allValue,setValue] = useState({
    username:"",
    password:"",
    showSubmitError:false,
    errorMsg:""
  })

  const onChangeUsername = event => {
    setValue({...allValue,username:event.target.value})
  }

  const onChangePassword = event => {
    setValue({...allValue,password:event.target.value})
  }

 const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    navigate("/")
  }

  const submitForm = async event => {
    event.preventDefault()
    const {username, password} = allValue
    const userDetails = {username, password}
    const url = 'http://localhost:3005/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url,options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwtToken)
    } else {
      setValue({...allValue,errorMsg:data.error_msg,showSubmitError: true})
    }
  }

  const renderPasswordField = () => (
    <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={allValue.password}
          onChange={onChangePassword}
          placeholder="Password"
          autoComplete="off"
        />
      </>
  )

  const renderUsernameField = () => (
    <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={allValue.username}
          onChange={onChangeUsername}
          placeholder="Username"
          autoComplete="off"
        />
      </>
  )

  const renderLoginPage=()=>(
    <div className='form-bg-container'>
        {allValue.showSubmitError && <p className="error-message">{allValue.errorMsg}</p>}
        <form className="form-container" onSubmit={submitForm}>
          <div>
          <div className="input-container">{renderUsernameField()}</div>
          <div className="input-container">{renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          </div>
        </form>
        <Link to="/signup">
        <button type="button" className="signup-button">SignUp</button>
        </Link>
      </div>
  )
  
  //Below we are using useEffect function for smooth functionality for routing
  useEffect(()=>{
    if(token!==undefined){
        navigate("/")
    }
  })
  //Below we are calling renderLoginPage function for displaying login page
  return (
      <div className="login-form-container">
        {renderLoginPage()}
     </div>
      )
}



export default LoginForm