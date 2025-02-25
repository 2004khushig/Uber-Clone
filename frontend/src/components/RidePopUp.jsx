import React from "react";

const RidePopUp = (props) => {
    return (
        <div >
            <h5 className="pd-5 pt-3 text-center w-[94%] absolute top-0 " onClick={() => {
                props.setRidePopupPanel(false)
            }}><i className="text-xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
            <h3 className="text-3xl font-semibold pb-4">New Ride Available</h3>
            <div className="flex justify-between items-center mt-3 p-3 bg-gray-300 rounded-lg">
                <div className="flex items-center gap-3 ">
                    <img className="h-12 w-12 rounded-full object-cover" src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" alt="" />
                    <h2 className="text-xl font-medium">Ella McCasey</h2>
                </div>
                <h5 className="text-xl font-semibold">
                    2.5Km
                </h5>
            </div>


            <div className="flex justify-between gap-3 flex-col items-center p-3 ">
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
                <div className="flex w-full items-center justify-between gap-10">
                    <button onClick={() => {
                        props.setConfirmRidePopupPanel(true)

                    }} className="flex items-center text-xl font-semibold px-8 justify-center bold bg-black text-white py-3 rounded mt-1">Accept</button>
                    <button onClick={() => {
                        props.setRidePopupPanel(false)

                    }} className="flex items-center text-xl font-semibold px-8 justify-center bold bg-gray-200 text-black py-3 rounded mt-1">Ignore</button>
                </div>
            </div>
        </div>
    )
}
export default RidePopUp;