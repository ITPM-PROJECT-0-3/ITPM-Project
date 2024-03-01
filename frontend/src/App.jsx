import React, { useState } from "react";
import styles from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminHomePage from "./pages/AdminHomePage";
import CordinaterAdminMainLayout from "./pages/CordinaterAdminMainLayout";


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
          
        
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
