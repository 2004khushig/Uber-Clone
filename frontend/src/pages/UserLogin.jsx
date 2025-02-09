import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { UserDataContext } from "../context/userContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/home"); 
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your email and password.");
    }

    setEmail("");
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
        <form onSubmit={submitHandler}> {/* ✅ Add onSubmit handler */}
          <h3 className="text-lg mb-2 mt-10 font-medium">What's your email?</h3>
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
            type="submit" // ✅ Ensure button is submit type
            className="flex items-center justify-center font-bold w-full bg-black text-white py-3 rounded mb-5 mt-5"
          >
            Login
          </button>
        </form>
      </div>
      <div>
        <p className="text-center">
          New Here?
          <Link to="/signup" className="text-blue-700">
            {" "}
            Create a new account
          </Link>
        </p>
        <p className="text-center mt-2 md-2">Or</p>
        <Link
          to="/captain-login"
          className="flex items-center justify-center font-bold w-full bg-black text-white py-3 rounded mt-3"
        >
          Login as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
