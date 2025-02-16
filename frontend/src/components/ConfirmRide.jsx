import React from "react";

const ConfirmRide = (props) => {
    return (
        <div>
            <h5 className="pd-5 pt-3 text-center w-[94%] absolute top-0 " onClick={() => {
                props.setVehiclePanelOpen(false)
            }}><i className="text-xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
            <h3 className="text-3xl font-semibold pb-4">Confirm your ride</h3>
            <div className="flex justify-between gap-3 flex-col items-center p-3 ">
                <img className="h-24" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                <div className="w-full ">
                    <div className="flex items-center mb-5 border-b-2">
                        <i className="text-2xl ri-map-pin-line"></i>
                        <div className="pl-5">
                            <h3 className="font-semibold text-2xl">562/11-A</h3>
                            <p className="text-gray-800 text-base mb-3">Kaikondrahalli, Bengaluru, Karnataka</p>
                        </div>
                    </div>
                    <div className="flex items-center mb-5 border-b-2">
                    <i className="text-2xl ri-map-pin-add-line"></i>
                        <div className="pl-5">
                            <h3 className="font-semibold text-2xl">Kempegowda  Airport</h3>
                            <p className="text-gray-800 text-base mb-3">Devanahalli, Bengaluru, Karnataka</p>
                        </div>


                    </div>
                    <div className="flex items-center ">
                    <i className="text-2xl ri-wallet-2-line"></i>
                        <div className="pl-5">
                            <h3 className="font-semibold text-2xl">₹193.20</h3>
                            <p className="text-gray-800 text-base">Cash</p>
                        </div>
                    </div>

                </div>
                <button onClick={()=>{
                    props.setVehicleFound(true);
                    props.setConfirmRidePanel(false);
                }}className="flex items-center text-xl font-semibold justify-center bold w-full bg-black text-white py-3 rounded mt-3">Confirm</button>
            </div>
        </div>
    )
}
export default ConfirmRide;