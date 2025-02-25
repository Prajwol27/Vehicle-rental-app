import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);



  const isTokenExpired = (token) => {
    if (!token) return true;

    try {
      const base64Payload = token.split(".")[1];
      if (!base64Payload) throw new Error("Invalid token structure");

      const decodedPayload = JSON.parse(atob(base64Payload));
      if (!decodedPayload.exp) throw new Error("Token does not contain expiration");

      const expirationTime = decodedPayload.exp * 1000;
      return Date.now() >= expirationTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };



  const hasExistingBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !user) return false;

      const response = await axios.get(`http://localhost:8080/api/bookings/user/${user.name}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.length > 0; 
    } catch (error) {
      console.error("Error checking existing booking:", error);
      return false;
    }
  };

  

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("loggedInUser");
    const storedIsAdmin = localStorage.getItem("isAdmin");

    if (token && storedUser && !isTokenExpired(token)) {
      setUser({ name: storedUser });
      setIsAuthenticated(true);
      setIsAdmin(storedIsAdmin === "true");
    } else {
      logout();
    }
  }, []);



  const fetchTokenFromBackend = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", { username, password });

      if (response.data && response.data.token) {
        console.log("Token received:", response.data.token);
        storeTokenInLS(response.data.token, username, response.data.isAdmin);
      } else {
        console.error("Failed to fetch token from backend", response.data);
      }
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  
  const storeTokenInLS = (serverToken, name, isAdmin) => {
    localStorage.setItem("token", serverToken);
    localStorage.setItem("loggedInUser", name);
    localStorage.setItem("isAdmin", isAdmin ? "true" : "false");
    setUser({ name });
    setIsAuthenticated(true);
    setIsAdmin(!!isAdmin);
  };

  
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isAdmin");
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isAdmin,
        storeTokenInLS,
        logout,
        fetchTokenFromBackend,
        isTokenExpired,
        hasExistingBooking, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
