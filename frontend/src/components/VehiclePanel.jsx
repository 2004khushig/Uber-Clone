import React from "react";
import ConfirmRide from "./ConfirmRide";

const VehiclePanel=(props)=>{
    return (
        <div><h5 className="pd-5 pt-3 text-center w-[94%] absolute top-0 " onClick={()=>{
            props.setVehiclePanelOpen(false)
        }}><i className="text-xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
            <h3 className="text-3xl font-semibold pb-4">Choose your ride</h3>
            <div onClick={()=>{
                props.setConfirmRidePanel(true)
            }}
            className="flex active:border-black  border-2 mb-2 rounded-xl w-full p-3  items-center justify-between">
                <img className="h-14" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                <div className=" w-1/2" >
                    <h4 className="font-semibold text-lg ">UberGo<span><i className="ri-user-line"></i>4</span></h4>
                    <h5 className="font-medium text-base ">2 mins away</h5>
                    <p className="font-normal text-xs text-gray-600 ">Affordable, Compact ride</p>
                </div>
                <h2 className="text-xl font-semibold">₹193.25</h2>
            </div>

            <div onClick={()=>{
                props.setConfirmRidePanel(true)
            }}className="flex active:border-black border-2 mb-2 rounded-xl w-full p-3  items-center justify-between">
                <img className="h-14" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                <div className=" w-1/2" >
                    <h4 className="font-semibold text-lg ">Moto<span><i className="ri-user-line"></i>1</span></h4>
                    <h5 className="font-medium text-base ">3 mins away</h5>
                    <p className="font-normal text-xs text-gray-600 ">Affordable, motorcycle ride</p>
                </div>
                <h2 className="text-xl font-semibold">₹65</h2>
            </div>

            <div onClick={()=>{
                props.setConfirmRidePanel(true)
            }}className="flex active:border-black border-2 mb-2 rounded-xl w-full p-3  items-center justify-between">
                <img className="h-14" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                <div className=" w-1/2" >
                    <h4 className="font-semibold text-lg ">UberAuto<span><i className="ri-user-line"></i>3</span></h4>
                    <h5 className="font-medium text-base ">3 mins away</h5>
                    <p className="font-normal text-xs text-gray-600 ">Affordable, Compact ride</p>
                </div>
                <h2 className="text-xl font-semibold">₹118.25</h2>
            </div></div>
    )
}
export default VehiclePanel;