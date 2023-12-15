import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

import Footer from '../Footer'
import NavBar from '../Navbar'

import './index.css'


const SignUp = ()=>{
    const navigate = useNavigate()

    const [userValue,setUser] = useState({
        username:"",
        password:"",
        name:"",
        gender:"",
        location:"",
        showSubmitError:false,
        errorMsg:""
      })

    const onSubmittDetails = async (event)=>{
        event.preventDefault()
        const {username, password,name,gender,location} = userValue
        if(username==="" && password===""){
            setUser({...userValue,showSubmitError:true,errorMsg:"Please Provide Valid Input"})
        }
        else{
            const userDetails = {username,password,name,gender,location}
                const url = 'http://localhost:3005/register'
                const options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(userDetails),
            }
            const response = await fetch(url,options)
            const data = await response.json()
            console.log(response)
            if (response.ok === true) {
                navigate("/login")
            } else {
                setUser({...userValue,showSubmitError:true,errorMsg:data.error_msg})
            }
        }
    }

    const onChangeUserName=(event)=>{
        setUser({...userValue,username:event.target.value})
    }

    const onChangePassword=(event)=>{
        setUser({...userValue,password:event.target.value})
    }

    const onChangeName=(event)=>{
        setUser({...userValue,name:event.target.value})
    }

    const onChangeGender=(event)=>{
        setUser({...userValue,gender:event.target.value})
    }

    const onChangeLocation=(event)=>{
        setUser({...userValue,location:event.target.value})
    }


        return (
            <>
            <NavBar/>
            <div className='signup-form-bg-container'>
                <img src="https://st.depositphotos.com/57803962/56464/v/450/depositphotos_564648844-stock-illustration-weather-forecast-icon-vector-illustration.jpg" alt="signup" className='signup-image'/>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiW1dwVi31Zwbf-QJ8kMZaXdPGHcIPkdBNeA&usqp=CAU" alt="weather" className='small-device-image'/>
            <form className='form-container' onSubmit={onSubmittDetails}>
                <label htmlFor="userName">Username</label>
                <input className='username-input' onChange={onChangeUserName} id='userName' type='text' value={userValue.username}/>
                <label htmlFor="password">Password</label>
                <input className='username-input' onChange={onChangePassword} id='password' type='text' value={userValue.password}/>
                <label htmlFor="name">Name</label>
                <input className='username-input' onChange={onChangeName} id='name' type='text' value={userValue.name}/>
                <label htmlFor="gender">Gender</label>
                <input className='username-input' onChange={onChangeGender} id='gender' type='text' value={userValue.gender}/>
                <label htmlFor="location">Location</label>
                <input className='username-input' onChange={onChangeLocation} id='location' type='text' value={userValue.location}/>
                <button type='submite' className='signup-btn'>Submit</button>
                {userValue.showSubmitError && <p className="error-message">{userValue.errorMsg}</p>}
            </form>
            </div>
            <Footer/>
            </>
        )
}


export default SignUp