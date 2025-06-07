import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/captainlogo.png';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    const { captain, setCaptain } = React.useContext(CaptainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        const captainData = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email,
            password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType,
            },
        };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/captains/register`,
                captainData
            );

            if (response.status === 201) {
                const data = response.data;
                setCaptain(data.captain);
                localStorage.setItem('token', data.token);
                navigate('/captain-home');
            }

            // Reset fields
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setVehicleColor('');
            setVehiclePlate('');
            setVehicleCapacity('');
            setVehicleType('');
        } catch (error) {
            console.error("Signup error:", error);
            alert("Signup failed. Check server or network.");
        }
    };

    return (
        <div className='py-5 px-5 bg-stone-700 flex flex-col justify-between h-screen'>
            <div>
                <form onSubmit={submitHandler}>
                    <img src={logo} alt='Cabsy Logo' className='w-20 -mt-5' />

                    <h3 className='text-lg font-medium mb-2 text-black'>What's our Captain's name</h3>
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

                    <h3 className='text-lg font-medium mb-2 text-black'>What's our Captain's email</h3>
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

                    <h3 className='text-lg font-medium mb-2 text-black'>Vehicle Information</h3>
                    <div className='flex mb-7 gap-4'>
                        <input
                            className='bg-stone-300 mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base text-black'
                            required
                            type='text'
                            placeholder='Vehicle Color'
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                        />
                        <input
                            className='bg-stone-300 mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base text-black'
                            required
                            type='text'
                            placeholder='Vehicle Plate'
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                        />
                    </div>

                    <div className='flex mb-7 gap-4'>
                        <input
                            className='bg-stone-300 mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base text-black'
                            required
                            type='text'
                            placeholder='Vehicle Capacity'
                            value={vehicleCapacity}
                            onChange={(e) => setVehicleCapacity(e.target.value)}
                        />
                        <select
                            required
                            className='bg-stone-300 mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base text-black'
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                        >
                            <option value="" disabled>Select Vehicle Type</option>
                            <option value="car">Car</option>
                            <option value="auto">Auto</option>
                            <option value="moto">Moto</option>
                        </select>
                    </div>

                    <button className='bg-stone-400 text-center font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base text-black'>
                        Create Captain Account
                    </button>
                </form>

                <p className='text-white text-center'>
                    Already have an account? <Link to='/captain-login' className='text-cyan-800'>Login here</Link>
                </p>
            </div>

            <div>
                <p className='text-[10px] leading-tight'>
                    The site is protected by reCAPTCHA and the{' '}
                    <span className='font-bold underline'>Google Privacy Policy</span> and{' '}
                    <span className='font-bold underline'>Terms of Service</span> apply.
                </p>
            </div>
        </div>
    );
};

export default CaptainSignup;
