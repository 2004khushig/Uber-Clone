import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
    return (
        <div className="h-screen">
            <Link to="/home" className=" right-2 top-2 fixed h-15 w-10 bg-white flex items-center justify-center rounded-full">
                <i className="text-lg font-medium ri-home-8-line"></i>
            </Link>
            <div className="h-1/2">
                <img
                    className="h-full w-full object-cover"
                    src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif"
                    alt="Background"
                />
            </div>
            <div className="h-1/2 p-4">
                <div className="flex items-center justify-between">
                    <img className="h-14" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                    <div className="text-right">
                        <h2 className="text-lg font-medium">Sameksh</h2>
                        <h4 className="text-xl font-semibold -mt-1 -mb-1">KA 34RT 2104</h4>
                        <p className="text-sm text-gray-600">White Suzuki S-Presso LXI</p>
                    </div>
                </div>

                <div className="flex justify-between gap-3 flex-col items-center p-3 ">

                    <div className="w-full ">

                        <div className="flex items-center mb-5 mt-5 border-b-2">
                            <i className="text-2xl ri-map-pin-add-line"></i>
                            <div className="pl-5">
                                <h3 className="font-semibold text-2xl">Kempegowda  Airport</h3>
                                <p className="text-gray-800 text-base mb-3">Devanahalli, Bengaluru, Karnataka</p>
                            </div>


                        </div>
                        <div className="flex items-center mb-5 border-b-2">
                            <i className="ri-road-map-line"></i>
                            <div className="pl-5">
                                <h3 className="font-semibold text-2xl">10 mins to destination</h3>
                                <p className="text-gray-800 text-base mb-3">3 mins fast</p>
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

                </div>
                <button className="flex items-center text-xl font-semibold justify-center bold w-full bg-black text-white py-3 rounded mt-3">Make a Payment</button>

            </div>
        </div>
    )
}
export default Riding;