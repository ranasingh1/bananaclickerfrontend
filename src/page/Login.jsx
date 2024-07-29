import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#01AFD1] to-[#4dd0e1]">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            id="username"
            label="username"
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            placeholder="Your username"
            required
          />
          <FormInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your Password"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#01AFD1] hover:bg-[#4dd0e1] text-white font-bold py-3 px-4 rounded-full transition duration-300"
          >
            Sign In
          </button>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
       
      </div>
    </div>
  );
};

export default Login;
