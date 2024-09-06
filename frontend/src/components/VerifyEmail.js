import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [isVerified, setIsVerified] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/user/verify/${token}`
        );

        if (response.status === 200) {
          setIsVerified(true);
          alert("Email verified successfully!");
          navigate("/user/login");
        } else if (response.status === 400) {
          const result = await response.json();
          alert(`Error: ${result.error}, Please try again.`);
        } else {
          alert("An internal error occurred. Please try again.");
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        alert("An error occurred. Please try again.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">{isVerified ? "Verified ✅" : "Verifying..."}</h2>
      </div>
    </div>
  );
};

export default VerifyEmail;
