import { Link } from "react-router-dom";
import React, { useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userData, setUserData] = useState({});
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const { captain, setCaptain } = React.useContext(CaptainDataContext);
  
    // const submitHandler = async(e) => {
    //   e.preventDefault();
    //   const CaptainData = {
    //     fullname: {
    //       firstname: firstName,
    //       lastname: lastName,
    //     },
    //     email: email,
    //     password: password,
    //     vehicle: {
    //       color: vehicleColor,
    //       plate: vehiclePlate,
    //       capacity: vehicleCapacity,
    //       vehicleType: vehicleType,
    //     },
    //   }; // Log it here before calling setUserData
  
    //   setUserData(CaptainData);
    //   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, CaptainData);
    //   if(response.status === 201){
    //     const data= response.data;
    //     setCaptain(data.captain);
    //     localStorage.setItem("token", response.data.token);
    //     navigate("/captain-home");
    //   }
  
    //   // Clear the form inputs
    //   setEmail('');
    //   setFirstName('');
    //   setLastName('');
    //   setPassword('');
    //   setVehicleColor('');
    //   setVehiclePlate('');
    //   setVehicleCapacity('');
    //   setVehicleType('');
    // };
    const submitHandler = async (e) => {
      e.preventDefault();
      const CaptainData = {
        fullname: {
          firstname: firstName,
          lastname: lastName,
        },
        email: email,
        password: password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType: vehicleType,
        },
      };
    
      console.log("Sending Data: ", CaptainData); // ✅ Log request payload
    
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/captains/register`,
          CaptainData
        );
        console.log("Response:", response.data);
    
        if (response.status === 201) {
          setCaptain(response.data.captain);
          localStorage.setItem("token", response.data.token);
          navigate("/captain-home");
        }
      } catch (error) {
        if (error.response) {
          console.error("Error Response Data:", error.response.data); // ✅ Log the actual error
          alert(`Signup Failed: ${JSON.stringify(error.response.data.errors)}`);
        } else {
          console.error("Signup Error:", error);
          alert("An unexpected error occurred.");
        }
      }
    };
    
  return (
    <div className="p-5 flex flex-col justify-between h-screen">
      <div>
        <img className="w-16" src="https://pngimg.com/d/uber_PNG24.png" alt="" />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg mb-2 mt-5 font-medium">Enter your name</h3>
          <div className="flex justify-between">
            <input
              className="bg-[#eeeeee] mb-1 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              type="text" placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] mb-1 rounded px-4 py-2 ml-2 w-1/2 border text-lg placeholder:text-base"
              type="text" placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <h3 className="text-lg mb-1 mt-2 font-medium">What's your email?</h3>
          <input
            className="bg-[#eeeeee] mb-1 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email" placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-lg mb-1 font-medium">Enter password</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base" required type="password" placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h3 className="text-lg mb-2 font-medium">Vehicle Information</h3>
          <div className="flex justify-between">
            <input
              className="bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              type="text" placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] mb-2 rounded px-4 py-2 ml-2 w-1/2 border text-lg placeholder:text-base"
              type="text" placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <input
              className="bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              type="number" placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
            <select
              className="bg-[#eeeeee] mb-2 rounded px-4 py-2 ml-2 w-1/2 border text-lg placeholder:text-base"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="">Select Vehicle Type</option>
              <option value="Car">Car</option>
              <option value="Auto">Auto</option>
              <option value="Motorcycle">MotorCycle</option>
            </select>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center bold w-full bg-black text-white py-3 rounded mb-2 mt-5"
          >
            Sign Up
          </button>
          <p className="text-center">
            Already have an account?
            <Link to="/captain-login" className="text-blue-700">
              {" "}
              Login Here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[9px] leading-tight">
          This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
}
export default CaptainSignup