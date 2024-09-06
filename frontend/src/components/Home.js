import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleUpdateDetails = () => {
    navigate("/user/update-details");
  };

  const handleChangePassword = () => {
    navigate("/user/change-password");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      <button
        onClick={handleUpdateDetails}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600 w-[170px]"
      >
        Update Details
      </button>
      <button
        onClick={handleChangePassword}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 w-[170px]"
      >
        Change Password
      </button>
    </div>
  );
};

export default Home;
