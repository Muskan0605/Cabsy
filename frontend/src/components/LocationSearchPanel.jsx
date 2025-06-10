import React from 'react'

const LocationSearchPanel = (props) => {
    console.log(props);

    // sample array for locations
    const locations = [
        '100D, Near Rose Cafe, Kapooor Mansion, Delhi',
        '24B, Near Chacha ji Resturant, Malhan House, Delhi',
        '100C, Near Amma Cafe, Malhotras Mansion, Delhi',
        '10D, Near Sharma Cafe, Mishra Mansion, Delhi'
    ]

  return (
    <div>
        {/* sample data */}
        {
            locations.map(function(elem){
                return <div
                onClick={() => {
                    props.setVehiclePanel(true)
                    props.setPanelOpen(false)
                }} 
                className='flex border-gray-100 active:border-black border-2 p-3 rounded-xl items-center my-2 justify-start gap-4'>
            <h2 className='bg-stone-200 h-10 flex items-center justify-center w-10 rounded-full'>
                <i className="ri-map-pin-fill text-lg"></i>
            </h2>
            <h4 className='text-base font-medium'>{elem}</h4>
        </div>
            })
        }

    </div>
  )
}

export default LocationSearchPanel