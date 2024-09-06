import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthPage from "./components/AuthPage";
import Login from "./components/Login";
import Register from "./components/Register";
import VerifyEmail from "./components/VerifyEmail";
import Home from "./components/Home";
import UpdateDetails from "./components/UpdateDetails";
import ChangePassword from "./components/ChangePassword";
import Admin from "./components/Admin";
import AdminUpdateDetails from "./components/AdminUpdateDetails";
import AdminResetPassword from "./components/AdminResetPassword";

function App() {
  return (
    <Router>
      <div>
      <Routes>
        <Route  path="/" element={<AuthPage />} />
        <Route  path="/user/login" element={<Login/>} />
        <Route  path="/user/register" element={<Register/>} />
        <Route  path="/user/verify/:token" element={<VerifyEmail/>} />
        <Route  path="/user/home" element={<Home/>} />
        <Route  path="/user/update-details" element={<UpdateDetails />} />
        <Route  path="/user/change-password" element={<ChangePassword />} />
        <Route  path="/admin/home" element={<Admin />} />
        <Route  path="/admin/update-user-details/:id" element={<AdminUpdateDetails />} />
        <Route  path="/admin/reset-user-password/:id" element={<AdminResetPassword />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
