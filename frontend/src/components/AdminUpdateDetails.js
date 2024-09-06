import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminUpdateDetails = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
  });
  const [warning, setWarning] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/user/get-details/${id}`
        ); 
        const data = await response.json();

        if (response.status === 200) {
          setUserData({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            country: data.country,
            phone: data.phone,
          });
          setWarning("");
        } else {
          setWarning(data.error);
        }
      } catch (error) {
        setWarning("An error occurred. Please try again.");
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5001/user/update-details/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const result = await response.json();

      if (response.status === 200) {
        if (result.emailChanged) {
          setWarning(`An verification email sent to ${userData.email}`);
        } else {
          setWarning("");
        }
        alert(`User details updated successfully!`);
        navigate("/admin/home");
      } else {
        setWarning(result.error);
      }
    } catch (error) {
      setWarning("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md min-w-[400px] mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Details</h2>
        {warning && <p className="text-red-500 mb-4 text-center">{warning}</p>}
        <form onSubmit={handleSaveChanges}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={userData.country}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdateDetails;
