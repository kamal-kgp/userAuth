import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminResetPassword = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [warning, setWarning] = useState("");
  const [showPassword, setShowPassword] = useState([false, false, false]);

  const { id } = useParams();
  const navigate = useNavigate();

  const handlePassVisibility = (index) => {
    setShowPassword((prevShowPassword) => {
      const newShowPassword = [...prevShowPassword];
      newShowPassword[index] = !prevShowPassword[index];
      return newShowPassword;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const passwordValidation = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      setWarning("New password and confirm password do not match.");
      return;
    }

    if (!passwordValidation(passwords.newPassword)) {
      setWarning(
        "Password must be at least 8 characters long and contain at least one number and special character."
      );
      return;
    }
    setWarning("");

    try {
      const response = await fetch(
        `http://localhost:5001/user/update-password/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwords),
        }
      );

      const result = await response.json();

      if (response.status === 200) {
        alert("Password changed successfully!");
        navigate("/admin/home"); 
      } else {
        setWarning(result.error); 
      }
    } catch (error) {
      setWarning("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md min-w-[400px] mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>

        {warning && (
          <div className="mb-4 text-red-500 text-center">{warning}</div>
        )}

        <form onSubmit={handleChangePassword}>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Old Password</label>
            <input
              type={showPassword[0] ? "text" : "password"}
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            <span
              className="absolute right-2 top-8 cursor-pointer"
              onClick={() => handlePassVisibility(0)}
            >
              {showPassword[0] ? "🙈" : "👁️"}
            </span>
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700">New Password</label>
            <input
              type={showPassword[1] ? "text" : "password"}
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            <span
              className="absolute right-2 top-8 cursor-pointer"
              onClick={() => handlePassVisibility(1)}
            >
              {showPassword[1] ? "🙈" : "👁️"}
            </span>
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700">Confirm New Password</label>
            <input
              type={showPassword[2] ? "text" : "password"}
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            <span
              className="absolute right-2 top-8 cursor-pointer"
              onClick={() => handlePassVisibility(2)}
            >
              {showPassword[2] ? "🙈" : "👁️"}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminResetPassword;
