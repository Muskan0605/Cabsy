import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userData, setUserData] = useState({});

    const navigate = useNavigate()

    const {user, setUser} = React.useContext(UserDataContext)

    const submitHandler = async (e) => {
        //e does not show default behavior so write this
        e.preventDefault();
        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password
        }
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, newUser)
        if(response.status === 201){
            const data = response.data
            setUser(data.user)
            localStorage.setItem('token', data.token)
            navigate('/home')
        }

        // console.log(userData);

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }

  return (
    <div className='p-7 bg-stone-700 flex flex-col justify-between h-screen'>
       <div>
         <form onSubmit={(e) => submitHandler(e)}>

        <img src={logo} alt='Cabsy Logo' className='w-32 -mt-9'/>

            <h3 className='text-lg font-medium mb-2 text-black'>What's your name</h3>
            <div className='flex gap-4 mb-5'>
                <input
                    className='bg-stone-300 w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base text-black'
                    required
                    type='text' 
                    placeholder='First name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    className='bg-stone-300 w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base text-black'
                    required
                    type='text' 
                    placeholder='Last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>

            <h3 className='text-lg font-medium mb-2 text-black'>What's your email</h3>

            <input 
            className='bg-stone-300 mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base text-black'
            required 
            type='email' 
            placeholder='email@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <h3 className='text-lg font-medium mb-2 text-black'>Enter Password</h3>

            <input 
            className='bg-stone-300 mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base text-black'
            required 
            type='password' 
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button className='bg-stone-400 text-center font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base text-black'>
            Create Account
            </button>

        </form>

        <p className='text-white text-center'>Already have a account?<Link to='/login' className='text-cyan-800'>Login here</Link> </p>

       </div>

       <div>
        <p className='text-[10px] leading-tight'>The site is protected by reCAPTCHA and the <span className='font-bold underline'>Google Privacy Policy</span> and <span className='font-bold underline'>Terms of Service</span> apply.</p>
       </div>
    </div>
  )
}

export default UserSignup