import React, { useRef, useState, useLayoutEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import CaptainDetails from "../components/CaptainDetails";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { ride, captain } = location.state || {};

    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);

    useLayoutEffect(() => {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            });
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            });
        }
    }, [finishRidePanel]);

    const handleCompleteRide = () => {
        navigate("/riding", { state: { ride, captain } });
    };

    return (
        <div className="h-screen relative">
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

            <div className="h-4/5 ">
                <LiveTracking/>
            </div>
            <div className="h-1/5 flex items-center relative justify-between p-6" onClick={() => setFinishRidePanel(true)}>
                <h5 className="pd-5 pt-3 text-center w-[94%] absolute top-0 "><i className="text-xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
                <h4 className="text-xl font-semibold">{ride ? `${ride.distance}Km Away` : '4Km Away'}</h4>
                <button onClick={handleCompleteRide} className="flex items-center text-xl font-semibold px-8 justify-center bold bg-black text-white py-3 rounded mt-1">Complete Ride</button>
            </div>
            <div ref={finishRidePanelRef} className="fixed w-full z-[500] bottom-0 h-screen translate-y-full bg-white px-3 py-8 pt-10">
                <FinishRide setFinishRidePanel={setFinishRidePanel} />
            </div>
        </div>
    );
};

export default CaptainRiding;