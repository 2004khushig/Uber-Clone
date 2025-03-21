import React from "react";

const LookingForDriver = (props) => {
    const fareAmount =
        props.fare?.[props.vehicleType] && typeof props.fare[props.vehicleType] === 'object'
            ? props.fare[props.vehicleType][props.vehicleType]
            : props.fare?.[props.vehicleType];
    return (
        <div>
        <h5 className="pd-5 pt-3 text-center w-[94%] absolute top-0 " onClick={() => {
            props.setVehicleFound(false)
        }}><i className="text-xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-3xl font-semibold pb-4">Looking for a Driver</h3>
        <div className="flex justify-between gap-3 flex-col items-center p-3 ">
            <img className="h-24" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
            <div className="w-full ">
                <div className="flex items-center mb-5 border-b-2">
                    <i className="text-2xl ri-map-pin-line"></i>
                    <div className="pl-5">
                        <h3 className="font-semibold text-2xl">Pickup</h3>
                        <p className="text-gray-800 text-base mb-3">{props.pickup}</p>
                    </div>
                </div>
                <div className="flex items-center mb-5 border-b-2">
                <i className="text-2xl ri-map-pin-add-line"></i>
                    <div className="pl-5">
                        <h3 className="font-semibold text-2xl">Destination</h3>
                        <p className="text-gray-800 text-base mb-3">{props.destination}</p>
                    </div>


                </div>
                <div className="flex items-center ">
                <i className="text-2xl ri-wallet-2-line"></i>
                    <div className="pl-5">
                        <h3 className="font-semibold text-2xl">₹{typeof fareAmount === "number" ? fareAmount.toFixed(2) : "N/A"}</h3>
                        <p className="text-gray-800 text-base">Cash</p>
                    </div>
                </div>

            </div>
            
        </div>
    </div>
    )
}
export default LookingForDriver;