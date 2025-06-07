import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/captainlogo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {captain, setCaptain} = React.useContext(CaptainDataContext)
    const navigate = useNavigate()
  
    const submitHandler = async (e) => {
            //e does not show default behavior so write this
            e.preventDefault();
            const captain = {
                email:email,
                password:password
            }
           
            try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/captains/login`, captain);

        if (response.status === 200) {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        }
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        alert("Login failed. Check your credentials or server.");
    }

            setEmail('')
            setPassword('')
        }

  return (
    <div className='p-7 bg-stone-700 flex flex-col justify-between h-screen'>
       <div>
         <form onSubmit={(e) => submitHandler(e)}>

        <img src={logo} alt='Cabsy Logo' className='w-20 -mt-5'/>

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

        <p className='text-white text-center'>Join a fleet? <Link to='/captain-signup' className='text-cyan-800'>Register as a Captain</Link> </p>

       </div>

       <div>
        <Link to={'/login'} className='bg-yellow-700 flex items-center justify-center font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base text-black'>
        Sign in as User
        </Link>
       </div>
    </div>
  )
}

export default CaptainLogin