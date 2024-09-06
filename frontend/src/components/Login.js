import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [isVerified, setIsVerified] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handlePassVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("userID", data.userID);
        alert("Login successful!");
        navigate("/user/home");
      } else if (response.status === 401) {
        setWarning(data.error);
      } else if (response.status === 403) {
        setWarning(data.error);
        setIsVerified(false);
      }
    } catch (error) {
      setWarning("An error occurred. Please try again.");
    }
  };

  const handleReverify = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/user/resend-verification",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        setIsVerified(true);
        setWarning(
          "Verification email sent successfully. Please check your inbox"
        );
      } else if (response.status === 404) {
        alert(`Error: ${data.error}`);
        navigate("/user/register");
      } else if (response.status === 400) {
        setWarning(data.error);
      } else {
        setWarning("Internal server error. Please try again.");
      }
    } catch (error) {
      setWarning("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {warning && <p className="text-red-500 text-center mb-4">{warning}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter registered email"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your password"
            />
            <span
              className="absolute right-2 top-8 cursor-pointer"
              onClick={handlePassVisibility}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        {!isVerified && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive a verification email ?{" "}
              <button
                onClick={handleReverify}
                className="text-blue-500 hover:underline"
              >
                Click here to resend
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
