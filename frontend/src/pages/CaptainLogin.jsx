import { Link } from "react-router-dom";
import React, { useState } from "react";

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password,
    });
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
          <Link
            to="/" type="submit"
            className="flex items-center justify-center bold w-full bg-black text-white py-3 rounded mb-5 mt-5"
          >
            Login
          </Link>
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
