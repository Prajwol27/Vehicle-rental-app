import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const { logout } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/log-in"), 1500); 
  }, [logout, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
