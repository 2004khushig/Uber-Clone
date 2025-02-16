import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const vehiclePanelRef=useRef(null);
    const panelCloseRef = useRef(null);
    const confirmRidePanelRef=useRef(null);
    const vehicleFoundRef=useRef(null);
    const waitingForDriverRef=useRef(null)
    const [vehiclePanelOpen,setVehiclePanelOpen]=useState(false)
    const [confirmRidePanel, setConfirmRidePanel]=useState(false)
    const [vehicleFound,setVehicleFound]=useState(false)
    const [waitingForDriver,setWaitingForDriver]=useState(false)

    const submitHandler = (e) => {
        e.preventDefault();
    };


    useLayoutEffect(() => {
        if (panelRef.current) {
            gsap.set(panelRef.current, { height: 0 });
        }
    }, []);

    useLayoutEffect(() => {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: "71vh",
                duration: 0.5,
                ease: "power2.out",
                padding:20,
            });
            gsap.to(panelCloseRef.current, {
                opacity: 1
            }
            )
        } else {
            gsap.to(panelRef.current, {
                height: 0,
                duration: 0.5,
                ease: "power2.out",
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            });
        }
    }, [panelOpen, panelCloseRef]);

    useLayoutEffect(()=>{
        if(vehiclePanelOpen){
            gsap.to(vehiclePanelRef.current,{
                transform:'translateY(0)'
            })
        }
        else{
            gsap.to(vehiclePanelRef.current,{
                transform:'translateY(100%)'
            })
        }

    },[vehiclePanelOpen])

    useLayoutEffect(()=>{
        if(confirmRidePanel){
            gsap.to(confirmRidePanelRef.current,{
                transform:'translateY(0)'
            })
        }
        else{
            gsap.to(confirmRidePanelRef.current,{
                transform:'translateY(100%)'
            })
        }

    },[confirmRidePanel])

    useLayoutEffect(() => {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                y: 0,
                duration: 0.5,
                ease: "power2.out",
            });
        } else {
            gsap.to(vehicleFoundRef.current, {
                y: "100%",
                duration: 0.5,
                ease: "power2.out",
            });
        }
    }, [vehicleFound]);

    useLayoutEffect(()=>{
        if(waitingForDriver){
            gsap.to(waitingForDriverRef.current,{
                transform:'translateY(0)'
            })
        }
        else{
            gsap.to(waitingForDriverRef.current,{
                transform:'translateY(100%)'
            })
        }

    },[waitingForDriver])
    

    return (
        <div className="h-screen relative overflow-hidden">
            <img
                className="w-20 absolute top-5 ml-5"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
                alt="Uber Logo"
            />
            <div className="h-screen w-screen">
                <img
                    className="h-full w-full object-cover"
                    src="https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG"
                    alt="Background"
                />
            </div>
            <div className="absolute bottom-0 w-full bg-white flex flex-col justify-end">
                <div className="h-[30%] p-6 bg-white relative">
                    <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)}
                        className="absolute opacity -0 top-1 right-3 text-2xl ">
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className="text-3xl font-semibold">Find a trip</h4>
                    <form  onSubmit={submitHandler}>
                        <div className="line absolute w-1 h-20 top-[45%] ml-5 bg-black rounded-full"></div>
                        <input
                            onClick={() => setPanelOpen(true)}
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            className="bg-[#eee] px-4 py-3 pl-14 text-xl rounded-xl w-full mb-4 mt-5"
                            type="text"
                            placeholder="Add a pickup location"
                        />
                        <input
                            onClick={() => setPanelOpen(true)}
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="bg-[#eee] px-4 py-3 pl-14 text-xl rounded-xl w-full"
                            type="text"
                            placeholder="Enter your destination"
                        />
                    </form>
                </div>
                <div
                    ref={panelRef}
                    className="bg-white overflow-hidden"
                >
                    {panelOpen && <LocationSearchPanel  setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>}
                </div>
            </div>
            <div ref={vehiclePanelRef}className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8 pt-10">
            <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen}/>

            </div>
            <div ref={confirmRidePanelRef}className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-10">
            <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>

            </div>
            <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-10">
            <LookingForDriver setVehicleFound={setVehicleFound}/>

            </div>
            <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-10">
            <WaitingForDriver setWaitingForDriver={setWaitingForDriver}/>

            </div>

            
        </div>
    );
};

export default Home;
