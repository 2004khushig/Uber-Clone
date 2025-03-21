import React, { useState, useRef, useLayoutEffect, useEffect, useContext } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainHome = () => {
    const [ridePopupPanel, setRidePopupPanel] = useState(false);
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
    const ridePopupPanelRef = useRef(null);
    const confirmRidePopupPanelRef = useRef(null);
    const [ride, setRide] = useState(null);
    const { socket } = useContext(SocketContext);
    const { captain } = useContext(CaptainDataContext);

    useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(position => {
            console.log("📍 Sending captain location:", position.coords);

            socket.emit("update-location-captain", {
                userId: captain._id,
                location: {
                    ltd: position.coords.latitude,
                    lng: position.coords.longitude
                }
            });
        });
    } else {
        console.error("❌ Geolocation is not supported");
    }

    // ✅ Listen for new ride requests from backend
    const handleNewRide = (data) => {
        console.log("🟢 Ride Received from Backend:", data);
        setRide(data);  // ✅ Store ride data
        setRidePopupPanel(true);  // ✅ Show the ride popup
    };

    socket.on("new-ride", handleNewRide);

    return () => {
        socket.off("new-ride", handleNewRide);
    };
}, [socket, captain]);

async function confirmRide() {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/rides/confirm`, {
        rideId: ride._id,
        captainId:captain._id,
    }
        ,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
}


    

    useLayoutEffect(() => {
        if (ridePopupPanel && ridePopupPanelRef.current) {
            gsap.to(ridePopupPanelRef.current, {
                transform: "translateY(0)",
                opacity: 1,
                duration: 0.3,
                ease: "power3.out"
            });
        } else if (ridePopupPanelRef.current) {
            gsap.to(ridePopupPanelRef.current, {
                transform: "translateY(100%)",
                opacity: 0,
                duration: 0.3,
                ease: "power3.in"
            });
        }
    }, [ridePopupPanel]);

    useLayoutEffect(() => {
        if (confirmRidePopupPanel && confirmRidePopupPanelRef.current) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: "translateY(0)",
                opacity: 1,
                duration: 0.3,
                ease: "power3.out"
            });
        } else if (confirmRidePopupPanelRef.current) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: "translateY(100%)",
                opacity: 0,
                duration: 0.3,
                ease: "power3.in"
            });
        }
    }, [confirmRidePopupPanel]);


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
                    className="h-10 w-10 flex items-center justify-center bg-white rounded-full"
                >
                    <i className="text-lg font-medium ri-logout-box-line"></i>
                </Link>
            </div>
            <div className="h-1/2">
                <img
                    className="h-full w-full object-cover"
                    src="https://developers.google.com/static/maps/documentation/navigation/android-sdk/images/stopSignsTrafficLightsAndroid.png"
                    alt="Background"
                />
            </div>

            
            <div className="h-1/2 p-4">
                <CaptainDetails />
            </div>

          
            <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8 pt-10">
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>

            {/* Confirm Ride Popup */}
            <div ref={confirmRidePopupPanelRef} className="fixed w-full z-10 bottom-0 h-screen translate-y-full bg-white px-3 py-8 pt-10">
                <ConfirmRidePopUp
                ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    setRidePopupPanel={setRidePopupPanel}
                />
            </div>
        </div>
    );
};

export default CaptainHome;
