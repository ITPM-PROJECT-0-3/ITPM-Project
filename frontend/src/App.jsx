import React, { useState } from "react";
import styles from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminHomePage from "./pages/AdminHomePage";
import CordinaterAdminMainLayout from "./pages/CordinaterAdminMainLayout";
import RegistrationForm from './components/form/RegistrationForm';
import LoginForm from './components/form/LoginForm';


function App() {

  return (
    <div className={styles.App}>
      <Router>
        <Toaster
          position="top-center"
          toastOptions={{ duration: 3000 }}
        ></Toaster>
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>

        <Route path="/admin-nav" element={<CordinaterAdminMainLayout />}>
              <Route index={true} path="" element={<AdminHomePage />} />
            </Route>
              <Route path="/registration" element={<RegistrationForm />} />
              <Route path="/loginGrp" element={<LoginForm />} />
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
