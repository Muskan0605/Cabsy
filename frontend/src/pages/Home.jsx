import React from 'react'
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1572239780645-203c467a49b5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D)] h-screen pt-0 flex justify-between flex-col w-full'>
         <img src={logo} alt='Cabsy Logo' className='w-32 ml-3 -mt-4'/>
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started with Cabsy!</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-stone-300 text-black py-3 rounded-lg mt-4'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home


// bg-stone-700