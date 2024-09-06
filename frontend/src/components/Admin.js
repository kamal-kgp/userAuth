import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5001/admin/get-users");
        const data = await response.json();

        if (response.status === 200) {
          setUsers(data);
        } else {
          alert("Error fetching users: ", data.error);
        }
      } catch (error) {
        alert("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateDetails = (userId) => {
    navigate(`/admin/update-user-details/${userId}`);
  };

  const handleChangePassword = (userId) => {
    navigate(`/admin/reset-user-password/${userId}`);
  };

  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center justify-center p-8 w-full space-y-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Registerd Users
        </h2>
        {users.map((user) => (
          <div className="flex justify-between bg-white shadow-md rounded-lg w-[90%] px-8 py-5" key={user._id}>
            <div className="flex justify-between items-center w-[60%]">
              <p className="text-[16px] leading-[20px] font-medium">
                {user.firstName + " " + user.lastName}
              </p>
              <p className="text-[16px] leading-[20px] font-medium">
                {user._id}
              </p>
              <p
                className="text-[16px] leading-[20px] font-medium"
                style={{
                  color: user.isVerified ? "green" : "red",
                }}
              >
                {user.isVerified ? "Verified" : "Not Verified"}
              </p>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => handleUpdateDetails(user._id)}
            >
              Update Details
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={() => handleChangePassword(user._id)}
            >
              Change Password
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
