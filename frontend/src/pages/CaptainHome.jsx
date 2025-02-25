import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";

const CaptainHome = () => {
    const[ridePopupPanel,setRidePopupPanel]=useState(true)
    const[confirmRidePopupPanel,setConfirmRidePopupPanel]=useState(false)
    const ridePopupPanelRef=useRef(null)
    const confirmRidePopupPanelRef=useRef(null)

    useLayoutEffect(()=>{
        if(ridePopupPanel){
            gsap.to(ridePopupPanelRef.current,{
                transform:'translateY(0)'
            })
        }
        else{
            gsap.to(ridePopupPanelRef.current,{
                transform:'translateY(100%)'
            })
        }

    },[ridePopupPanel])
    useLayoutEffect(()=>{
        if(confirmRidePopupPanel){
            gsap.to(confirmRidePopupPanelRef.current,{
                transform:'translateY(0)'
            })
        }
        else{
            gsap.to(confirmRidePopupPanelRef.current,{
                transform:'translateY(100%)'
            })
        }

    },[confirmRidePopupPanel])

    return (
        <div className="h-screen">

            {/* Top Bar */}
            <div className="fixed p-3 top-0 w-full flex items-center justify-between">
                <img
                    className="w-20 ml-2"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
                    alt="Uber Logo"
                />

                <Link
                    to="/home"
                    className="h-10 w-10 flex items-center justify-center bg-white rounded-full "
                >
                    <i className="text-lg font-medium ri-logout-box-line"></i>
                </Link>
            </div>

            {/* Map / Background Image */}
            <div className="h-1/2">
                <img
                    className="h-full w-full object-cover"
                    src="https://developers.google.com/static/maps/documentation/navigation/android-sdk/images/stopSignsTrafficLightsAndroid.png"
                    alt="Background"
                />
            </div>

            {/* Bottom Section */}
            <div className="h-1/2 p-4">
                <CaptainDetails />
            </div>
            <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8 pt-10">
                <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>

            </div>

            <div ref={confirmRidePopupPanelRef} className="fixed w-full z-10 bottom-0 h-screen translate-y-full bg-white px-3 py-8 pt-10">
                <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>

            </div>
        </div>
    );
}

export default CaptainHome;
