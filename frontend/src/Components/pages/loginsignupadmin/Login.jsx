import React, { useState } from "react";
import emailIcon from "../../../images/mail.png";
import passwordIcon from "../../../images/pw.png";
import './Login.css';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; 
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
  
    if (!email || !password) {
      return toast.error("All fields are required!");
    }
  
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });
  
      if (!response.ok) {
        throw new Error("Failed to connect to the server.");
      }
  
      const result = await response.json();
      const { success, message, token, name, isAdmin, error } = result;
  
      if (success) {
        toast.success(message);
        storeTokenInLS(token, name, isAdmin);
  
       
        console.log("Token stored in localStorage:", localStorage.getItem("token"));
  
        setTimeout(() => {
          if (isAdmin) {
            navigate("/admin"); 
          } else {
            navigate("/"); 
          }
        }, 1000);
      } else {
        toast.error(error?.details?.[0]?.message || message || "Something went wrong!");
      }
    } catch (err) {
      toast.error("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="main">
      <div className="container">
        <div className="boxes">
          <div className="box1">
            <div className="userForm">
              <div className="show">
                <h1 className="txt-login">Login</h1>
                <p className="sub">Login to your account!</p>
              </div>
              <div className="userData">
                <form onSubmit={handleLogin}>
                  <div className="email">
                    <img src={emailIcon} alt="Email Icon" height="20px" width="20px" />
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Email" 
                      onChange={handleChange} 
                      value={loginInfo.email} 
                      required 
                    />
                  </div>
                  <div className="password">
                    <img src={passwordIcon} alt="Password Icon" height="20px" width="20px" />
                    <input 
                      type="password" 
                      name="password" 
                      placeholder="Password" 
                      onChange={handleChange} 
                      value={loginInfo.password} 
                      required 
                    />
                  </div>
                  <div className="button1">
                    <button className="btn-text" type="submit" disabled={loading}>
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </div>
                </form>
              </div>
              <div className="signup">
                <p>Don't have an account? <a href="/sign-up">Signup</a></p>
              </div>
            </div>
          </div>
          <div className="box2">
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
