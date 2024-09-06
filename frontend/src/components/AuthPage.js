import React from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/user/login");
  };

  const handleRegisterClick = () => {
    navigate("/user/register");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold text-center mb-4">Welcome</h1>
        <button
          onClick={handleRegisterClick}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full mb-4"
        >
          Register
        </button>
        <button
          onClick={handleLoginClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
