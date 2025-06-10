import React, { useRef, useState } from 'react';
import logo from '../assets/logo.png';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height: '70%',
        opacity: 1,
        padding: 24
      })
      gsap.to(panelCloseRef.current,{
        opacity: 1
      })
    }else{
      gsap.to(panelRef.current,{
        height: '0%',
        opacity: 0,
        padding: 0
      })
      gsap.to(panelCloseRef.current,{
        opacity: 0
      })
    }
  },[panelOpen])

  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current, {
      transform: 'translateY(0)'
    })
    }else{
      gsap.to(vehiclePanelRef.current, {
      transform: 'translateY(100%)'
    })
    }
  },[vehiclePanel])

  return (
    <div className='relative h-screen w-screen overflow-hidden'>

      {/* Background GIF covering entire screen */}
      <img 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif' 
        alt='Background Map'
      />

      {/* Logo on top-left corner */}
      <img 
        src={logo} 
        alt='Cabsy Logo' 
        className='absolute top-0 left-4 w-32'
      />

      {/* Trip Search Box */}
      <div className='absolute flex flex-col justify-end h-screen top-0 w-full font-semibold'>

      <div className='h-[30%] p-6 bg-stone-100 relative'>

      <h5
      ref={panelCloseRef}
      onClick={() => {
        setPanelOpen(false)
      }} 
      className='absolute opacity-0 top-6 right-6 text-2xl'>
        <i className="ri-arrow-down-wide-line"></i>
      </h5>

        <h4 className='text-2xl font-semibold text-black mb-2'>Find a trip</h4> 

        <form 
        onSubmit={(e) => {
          submitHandler(e)
        }}
        className='space-y-2'>

        <div className='line absolute h-16 w-1 top-[30%] left-10 bg-slate-700 rounded-full'></div>
          <input 
            onClick={() => {
              setPanelOpen(true)
            }}
            value={pickup}
            onChange={(e) => {
              setPickup(e.target.value)
            }}
            type="text" 
            placeholder='Add a pick-up location'
            className='w-full px-12 py-2 text-lg rounded-lg border border-gray-300 text-black bg-stone-300 placeholder-gray-500'
          />
          <input
            onClick={() => {
              setPanelOpen(true)
            }} 
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value)
            }}
            type='text' 
            placeholder='Enter your destination'
            className='w-full px-12 py-2 text-lg rounded-lg border border-gray-300 text-black bg-stone-300 placeholder-gray-500'
          />
        </form>
      </div>

        <div ref={panelRef} className=' bg-stone-100 h-0'>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}/>
        </div>
      </div>

     {/* New component */}
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-stone-100 px-3 py-8'>
      <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>

        <div className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
          <img
          className='h-12' 
          src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png' alt=''/>
          <div className='-ml-2 w-1/2'>
            <h4 className='font-medium text-base'>CabsyGo <span> <i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className='font-medium text-sm'>5 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹193</h2>
        </div>

        <div className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
          <img
          className='h-12' 
          src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png' alt=''/>
          <div className='-ml-2 w-1/2'>
            <h4 className='font-medium text-base'>Moto <span> <i className="ri-user-3-fill"></i>1</span></h4>
            <h5 className='font-medium text-sm'>4 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹70</h2>
        </div>

        <div className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
          <img
          className='h-12' 
          src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png' alt=''/>
          <div className='-ml-2 w-1/2'>
            <h4 className='font-medium text-base'>Auto <span> <i className="ri-user-3-fill"></i>3</span></h4>
            <h5 className='font-medium text-sm'>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, auto rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹120</h2>
        </div>

        <div className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
          <img
          className='h-12' 
          src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png' alt=''/>
          <div className='w-1/2'>
            <h4 className='font-medium text-base'>Premier <span> <i className="ri-user-3-fill"></i>6</span></h4>
            <h5 className='font-medium text-sm'>4 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, premium rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹250</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;

