import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import {SocketContext} from "../context/SocketContext"
import {useContext} from "react"
import {UserDataContext} from "../context/userContext"
import {useNavigate} from "react-router-dom"
import LiveTracking from "../components/LiveTracking";

const Home = () => {
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const panelRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const[ride,setRide]=useState(null)
    const [fare,setFare]=useState({});
    const {socket}=useContext(SocketContext)
    const {user}=useContext(UserDataContext)
    const navigate=useNavigate()

    useEffect(() => {
        if (!socket || !user) return;  // Prevents errors when socket is null
        socket.emit("join",{userType:"user",userId:user._id})
    }, [user]);

    socket.on("ride-started", ride=> {
       
        setWaitingForDriver(false)
        navigate('/riding')
    })
    socket.on("ride-confirmed", ride=> {
        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

    const handlePickupChange = async (e) => {
        setPickup(e.target.value);

        try {
            const url = `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`;

            const response = await axios.get(url, {
                params: { input: e.target.value },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            setPickupSuggestions(response.data || []);
        } catch {

        }
    };





    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)

        } catch {

        }
    }
    // async function findTrip() {
    //     setVehiclePanelOpen(true);
    //     setPanelOpen(false);
    
    //     try {
    //         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {   
    //             params: { pickup, destination },
    //             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    //         });
    
    //         console.log("Fetched Fares:", response.data);
    //         setFare(response.data.fares); // ✅ Store the fetched fares in state
    //     } catch (error) {
    //         console.error("Error fetching fares:", error);
    //     }
    // }
    async function findTrip() {
        setVehiclePanelOpen(true);
        setPanelOpen(false);
    
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {   
                params: { pickup, destination },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
    
            console.log("Fetched Fares Response:", response.data);
    
            if (!response.data || !response.data.fares) {
                console.error("No fare data available");
                return;
            }
    
            setFare({
                auto: response.data.fares.auto?.auto || 0,
                car: response.data.fares.car?.car || 0,
                moto: response.data.fares.moto?.moto || 0
            });
    
            console.log("Updated Fare State:", {
                auto: response.data.fares.auto?.auto || 0,
                car: response.data.fares.car?.car || 0,
                moto: response.data.fares.moto?.moto || 0
            });
    
        } catch (error) {
            console.error("Error fetching fares:", error);
        }
    }
    
    


    const submitHandler = (e) => {
        e.preventDefault();
    };
    useEffect(() => {
        const fetchSuggestions = async (inputValue) => {
            const token = localStorage.getItem('token');

            if (!token) {
                return;  // Stop execution if there's no token
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`, {
                    params: { input: inputValue },
                    headers: { Authorization: `Bearer ${token}` }
                });

                return response.data;
            } catch {

            }
        };


        fetchSuggestions();
    }, []);






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
                padding: 20,
            });
            gsap.to(panelCloseRef.current, {
                opacity: 1
            });
        } else {
            gsap.to(panelRef.current, {
                height: 0,
                duration: 0.5,
                ease: "power2.out",
            });
            gsap.to(panelCloseRef.current, {
                opacity: 0
            });
        }
    }, [panelOpen, panelCloseRef]);

    useLayoutEffect(() => {
        if (vehiclePanelOpen) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            });
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            });
        }
    }, [vehiclePanelOpen]);

    useLayoutEffect(() => {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            });
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            });
        }
    }, [confirmRidePanel]);

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

    useLayoutEffect(() => {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            });
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            });
        }
    }, [waitingForDriver]);

    async function findTrip() {
        setVehiclePanelOpen(true);
        setPanelOpen(false);
        const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {   
            params: { pickup, destination },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        
        console.log(response.data)

    }

    return (

        <div className="h-screen relative overflow-hidden">
            <img
                className="w-20 absolute top-5 ml-5"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
                alt="Uber Logo"
            />
            <div className="h-screen w-screen">
                <LiveTracking/>
            </div>
            <div className="absolute bottom-0 w-full bg-white flex flex-col justify-end">
                <div className="h-[30%] p-6 bg-white relative">
                    <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)}
                        className="absolute opacity -0 top-1 right-3 text-2xl ">
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className="text-3xl font-semibold">Find a trip</h4>
                    <form onSubmit={submitHandler}>
                        <div className="line absolute w-1 h-20 top-[45%] ml-5 bg-black rounded-full"></div>
                        <input
                            onClick={() => { setPanelOpen(true); setActiveField('pickup'); }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className="bg-[#eee] px-4 py-3 pl-14 text-xl rounded-xl w-full mb-4 mt-5"
                            type="text"
                            placeholder="Add a pickup location"
                        />
                        <input
                            onClick={() => { setPanelOpen(true); setActiveField('destination'); }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className="bg-[#eee] px-4 py-3 pl-14 text-xl rounded-xl w-full"
                            type="text"
                            placeholder="Enter your destination"
                        />
                    </form>

                </div>
                <button onClick={findTrip} className="flex items-center justify-center font-bold ml-5 mr-5 bg-black text-white py-3 rounded-lg mb-5 mt-5">
                    Find a Ride
                </button>

                <div
                    ref={panelRef}
                    className="bg-white overflow-hidden"
                >
                    {panelOpen && <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanelOpen}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                        setPickupSuggestions={setPickupSuggestions}  // ✅ Fix
                        setDestinationSuggestions={setDestinationSuggestions}  // ✅ Fix
                    />}
                </div>
            </div>
            <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8 pt-10">
                <VehiclePanel
                selectVehicle={selectVehicleType} 
                fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} />
            </div>
            <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-10">
                <ConfirmRide
                createRide={createRide}
                pickup={pickup} destination={destination} fare={fare}
                vehicleType={vehicleType}
                 setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
            </div>
            <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-10">
                <LookingForDriver
                createRide={createRide}
                pickup={pickup} destination={destination} fare={fare}
                vehicleType={vehicleType} setVehicleFound={setVehicleFound} />
            </div>
            <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-10">
                <WaitingForDriver 
                ride={ride}
                setVehicleFound={setVehicleFound}
                waitingForDriver={waitingForDriver}
                setWaitingForDriver={setWaitingForDriver} />
            </div>
        </div>
    );
};

export default Home;
