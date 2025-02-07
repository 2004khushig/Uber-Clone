import { Link } from "react-router-dom";
import React, { useState } from "react";


const CaptainSignup = () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userData, setUserData] = useState({});
  
    const submitHandler = (e) => {
      e.preventDefault();
      const dataToLog = {
        fullName: {
          firstName: firstName,
          lastName: lastName,
        },
        email: email,
        password: password,
      }; // Log it here before calling setUserData
  
      setUserData(dataToLog);
  
      // Clear the form inputs
      setEmail('');
      setFirstName('');
      setLastName('');
      setPassword('');
    };
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img className="w-16" src="https://pngimg.com/d/uber_PNG24.png" alt="" />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg mb-2 mt-5 font-medium">Enter your name</h3>
          <div className="flex justify-between">
            <input
              className="bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              type="text" placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] mb-2 rounded px-4 py-2 ml-2 w-1/2 border text-lg placeholder:text-base"
              type="text" placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <h3 className="text-lg mb-2 mt-2 font-medium">What's your email?</h3>
          <input
            className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email" placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-lg mb-2 font-medium">Enter password</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base" required type="password" placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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