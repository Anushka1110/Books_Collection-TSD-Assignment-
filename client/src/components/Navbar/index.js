import {Link,useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'


const NavBar = ()=>{
    const navigate = useNavigate()
    
    const onLogout=()=>{
        Cookies.remove('jwt_token')
        navigate('/login')
    }

    return(
    <nav className='Navbar-container'>
        <ul className='nav-list-container'>
            <Link to="/">
                <li className='nav-items'>Home</li>
            </Link>
            <Link to="/service">
                <li className='nav-items'>Service</li>
            </Link>
            <Link to='/aboutus'>
                <li className='nav-items'>About Us</li>
            </Link>
        </ul>
        <button type="button" onClick={onLogout} className='logout-btn'>Logout</button>
    </nav>
)
}


export default NavBar