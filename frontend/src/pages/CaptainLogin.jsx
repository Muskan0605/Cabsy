import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/captainlogo.png';


const CaptainLogin = () => {
    const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [captainData, setCaptainData] = useState({});
    
        const submitHandler = (e) => {
            //e does not show default behavior so write this
            e.preventDefault();
            setCaptainData({
                email:email,
                password:password
            })
            setEmail('');
            setPassword('')
        }
        // console.log(captainData);

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