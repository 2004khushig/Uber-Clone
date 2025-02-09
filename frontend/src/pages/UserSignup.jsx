import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { UserDataContext } from "../context/userContext";  // Fix import

import axios from "axios";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { user, setUser } = useContext(UserDataContext); 
  const navigate = useNavigate();
 // Fix context hook usage

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   const newUser = {
  //     fullname: {
  //       firstname: firstName,
  //       lastname: lastName,
  //     },
  //     email: email,
  //     password: password,
  //   };

  //   try {
  //     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
  //     if (response.status === 201) {
  //       const data = response.data;
  //       setUser(data.user);
  //       // Redirect to home or desired route after successful registration
  //     }
  //   } catch (error) {
  //     console.error("Error during registration:", error);
  //   }

  //   // Clear fields after submission
  //   setEmail("");
  //   setFirstName("");
  //   setLastName("");
  //   setPassword("");
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,  // Make sure to use 'firstname' here as the backend expects
        lastname: lastName     // Same for 'lastname'
      },
      email: email,
      password: password,
    };
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/home");
        // Redirect to home or desired route after successful registration
      }
    } catch (error) {
      console.error("Error during registration:", error);
  
      // Check if the error response contains validation details
      if (error.response) {
        console.log("Server validation errors:", error.response.data.errors);
      }
    }
  
    // Clear fields after submission
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };
  
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt="Uber Logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg mb-2 mt-10 font-medium">Enter your name</h3>
          <div className="flex justify-between">
            <input
              className="bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] mb-2 rounded px-4 py-2 ml-2 w-1/2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <h3 className="text-lg mb-2 mt-2 font-medium">What's your email?</h3>
          <input
            className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-lg mb-2 font-medium">Enter password</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center justify-center font-bold w-full bg-black text-white py-3 rounded mb-2 mt-5"
          >
            Sign Up
          </button>
          <p className="text-center">
            Already have an account?
            <Link to="/login" className="text-blue-700">
              {" "}
              Login Here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[9px] leading-tight">
          By proceeding, you consent to get calls, WhatsApp, or SMS messages,
          including by automated means, from Uber and its affiliates to the number
          provided.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
