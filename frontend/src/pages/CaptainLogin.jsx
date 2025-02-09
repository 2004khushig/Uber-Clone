import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {CaptainDataContext} from "../context/CaptainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const navigate= useNavigate();

  const submitHandler = async(e) => {
    e.preventDefault();
    const captain={
      email: email,
      password: password,
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);
    if(response.status === 200){
      const data= response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", response.data.token);
      navigate("/captain-home");
    }
    setEmail('');
    setPassword('');
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16"
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="Uber Logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg mb-2 mt-2 font-medium">What's your email?</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg mb-2 font-medium">Enter password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="password"
          />
          <button
             type="submit"
            className="flex items-center justify-center bold w-full bg-black text-white py-3 rounded mb-5 mt-5"
          >
            Login
          </button>
        </form>
      </div>
      <div>
        <p className="text-center">
          Join the fleet?
          <Link to="/captain-signup" className="text-blue-700">
            {" "}
            Register as a Captain
          </Link>
        </p>
        <p className="text-center mt-2 md-2">Or</p>
        <Link
          to="/login"
          className="flex items-center justify-center bold w-full bg-black text-white py-3 rounded mt-3"
        >
          Login as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
