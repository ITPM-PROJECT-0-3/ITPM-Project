import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(email, password) {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/supervisor-login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log("Logged in successfully:", response.data);
      setCurrentUser(response.data); // Assume you store only the email for now
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setCurrentUser(null);
  }

  useEffect(() => {
    // Optionally check the token validity upon initial load
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token) {
      setCurrentUser(user);
      // Update accordingly
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
