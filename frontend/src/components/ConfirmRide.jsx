import React from 'react'

const ConfirmRide = (props) => {
    // Ensure fare[vehicleType] exists and is a valid number
    const fareAmount =
        props.fare?.[props.vehicleType] && typeof props.fare[props.vehicleType] === 'object'
            ? props.fare[props.vehicleType][props.vehicleType]
            : props.fare?.[props.vehicleType];

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setConfirmRidePanel(false)
            }}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-3xl font-semibold mb-5'>Confirm your Ride</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-2xl font-medium'>Pickup</h3>
                            <p className='text-lg -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-2xl font-medium'>Destination</h3>
                            <p className='text-lg -mt-1 text-gray-600'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-2xl font-medium'>₹{typeof fareAmount === "number" ? fareAmount.toFixed(2) : "N/A"}</h3>
                            <p className='text-lg -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)
                    props.createRide()
                }} className="flex items-center justify-center font-bold ml-5 w-full mr-5 bg-black text-white py-3 rounded-lg mb-5">
                    Confirm
                </button>
            </div>
        </div>
    )
}

export default ConfirmRide
