import React, { useState, useRef, useLayoutEffect, useEffect } from "react";

const VehiclePanel = (props) => {
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    // Extract fare values from the nested props.fare object
    const carFare = props.fare?.car?.toFixed(2) ?? "N/A";
const motoFare = props.fare?.moto?.toFixed(2) ?? "N/A";
const autoFare = props.fare?.auto?.toFixed(2) ?? "N/A";



    const handleCarSelection = () => {
        if (!props.fare.car) return; // Prevents opening without valid fare
        props.createRide('car');
        props.selectVehicle('car');
        props.setConfirmRidePanel(true);
    };

    const handleMotoSelection = () => {
        if (!props.fare.moto) return;
        props.createRide('moto');
        props.selectVehicle('moto');
        props.setConfirmRidePanel(true);
    };

    const handleAutoSelection = () => {
        if (!props.fare.auto) return;
        props.createRide('auto');
        props.selectVehicle('auto');
        props.setConfirmRidePanel(true);
    };


    return (
        <div>
            <h5 className="pd-5 pt-3 text-center w-[94%] absolute top-0"
                onClick={() => props.setVehiclePanelOpen(false)}>
                <i className="text-xl text-gray-500 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-3xl font-semibold pb-4">Choose your ride</h3>

            <div onClick={handleCarSelection}
                className="flex active:border-black border-2 mb-2 rounded-xl w-full p-3 items-center justify-between">
                <img className="h-14" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="UberGo" />
                <div className="w-1/2">
                    <h4 className="font-semibold text-lg">UberGo <span><i className="ri-user-line"></i>4</span></h4>
                    <h5 className="font-medium text-base">2 mins away</h5>
                    <p className="font-normal text-xs text-gray-600">Affordable, Compact ride</p>
                </div>
                <h2 className="text-xl font-semibold">₹{carFare}</h2>
            </div>

            <div onClick={handleMotoSelection}
                className="flex active:border-black border-2 mb-2 rounded-xl w-full p-3 items-center justify-between">
                <img className="h-14" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="Moto" />
                <div className="w-1/2">
                    <h4 className="font-semibold text-lg">Moto <span><i className="ri-user-line"></i>1</span></h4>
                    <h5 className="font-medium text-base">3 mins away</h5>
                    <p className="font-normal text-xs text-gray-600">Affordable, motorcycle ride</p>
                </div>
                <h2 className="text-xl font-semibold">₹{motoFare}</h2>
            </div>

            <div onClick={handleAutoSelection}
                className="flex active:border-black border-2 mb-2 rounded-xl w-full p-3 items-center justify-between">
                <img className="h-14" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="UberAuto" />
                <div className="w-1/2">
                    <h4 className="font-semibold text-lg">UberAuto <span><i className="ri-user-line"></i>3</span></h4>
                    <h5 className="font-medium text-base">3 mins away</h5>
                    <p className="font-normal text-xs text-gray-600">Affordable, Compact ride</p>
                </div>
                <h2 className="text-xl font-semibold">₹{autoFare}</h2>
            </div>
        </div>
    );
};

export default VehiclePanel;
