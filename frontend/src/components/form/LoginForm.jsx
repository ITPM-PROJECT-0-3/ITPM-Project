/*
import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/student/loginGrp",
        { username, password }
      );
      console.log(response.data.group);
      alert("Login successful!");

      const authToken = response.data.token;
      localStorage.setItem("authToken", authToken);
      console.log(authToken);

      const userData = JSON.stringify(response.data.group);
      localStorage.setItem("UserInfo", userData);

      console.log(response.data.group.UserType);

      if (response.data.group.UserType === "Examiner") {
        localStorage.setItem("UserEmail", response.data.group.username);
        navigate("/examiner-nav");
      } else {
        navigate(`/getOneGroup/${username}`);
      }
    } catch (err) {
      setError("Invalid username or password.");
      console.error(err);
    }
  };

  return (
    <div id="sachini_form">
      <h2 id="sachini_heading">Login</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <center>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </center>
      </form>
      {error && <p id="sachini_error">{error}</p>}
    </div>
  );
};

export default LoginForm;
*/


import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import Footer from '../../components/Footer/Footer'; 
import NavigationBar from '../../components/NavigationBar/NavigationBar'; 

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/student/loginGrp",
        { username, password }
      );
      console.log(response.data.group);
      alert("Login successful!");

      const authToken = response.data.token;
      localStorage.setItem("authToken", authToken);
      console.log(authToken);

      const userData = JSON.stringify(response.data.group);
      localStorage.setItem("UserInfo", userData);

      console.log(response.data.group.UserType);

      if (response.data.group.UserType === "Examiner") {
        localStorage.setItem("UserEmail", response.data.group.username);
        navigate("/examiner-nav");
      } else if (username == "sachini00" && password == "sachini") {
        navigate("/student-group-management");
      }else {
        navigate(`/getOneGroup/${username}`);
      }
    } catch (err) {
      setError("Invalid username or password.");
      console.error(err);
    }
  };

  return (
    <div>
      <NavigationBar /> {/* Include the NavigationBar component at the top */}
      <div id="sachini_form">
        <h2 id="sachini_heading">Login</h2>
        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <center>
            <button type="button" onClick={handleLogin}>
              Login
            </button>
            <p>Haven't an account? <a href="http://localhost:4000/registration">SIGN UP</a></p>
          </center>
        </form>
        {error && <p id="sachini_error">{error}</p>}
      </div>
      <Footer /> {/* Include the Footer component at the bottom */}
    </div>
  );
};

export default LoginForm;
