import React from "react";

const WaitingForDriver = (props) => {
    return (
        <div>
            <h5 className="pd-5 pt-3 text-center w-[94%] absolute top-0 " onClick={() => {
                props.setWaitingForDriver(false)
            }}><i className="text-xl text-gray-500 ri-arrow-down-wide-line"></i></h5>

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

            </div>
        </div>
    )
}
export default WaitingForDriver;