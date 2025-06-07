import React, { useState, useContext } from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});

    const {user, setUser} = useContext(UserDataContext)
    const navigate = useNavigate()

  
  const submitHandler = async (e) => {
  e.preventDefault();

  const userData = {
    email: email,
    password: password,
  };

  try {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const response = await axios.post(`${BASE_URL}/users/login`, userData);

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token)
      navigate('/home');
    }
  } catch (error) {
    console.error("Login failed:", error.response?.data?.message || error.message);
  }

  setEmail('');
  setPassword('');
};


  return (
    <div className='p-7 bg-stone-700 flex flex-col justify-between h-screen'>
       <div>
         <form onSubmit={(e) => submitHandler(e)}>

        <img src={logo} alt='Cabsy Logo' className='w-32 -mt-9'/>

            <h3 className='text-lg font-medium mb-2 text-black'>What's your email</h3>

            <input 
            className='bg-stone-300 mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base text-black'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            type='email' 
            placeholder='email@example.com'
            />

            <h3 className='text-lg font-medium mb-2 text-black'>Enter Password</h3>

            <input 
            className='bg-stone-300 mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base text-black'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            type='password' 
            placeholder='password'
            />

            <button className='bg-stone-400 text-center font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base text-black'>
            Login
            </button>

        </form>

        <p className='text-white text-center'>New here? <Link to='/signup' className='text-yellow-700'>Create new Account</Link> </p>

       </div>

       <div>
        <Link to={'/captain-login'} className='bg-cyan-800 flex items-center justify-center font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base text-black'>
        Sign in as Captain
        </Link>
       </div>
    </div>
  )
}

export default UserLogin