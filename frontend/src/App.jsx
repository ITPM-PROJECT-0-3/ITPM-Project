import React from "react";
import styles from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminHomePage from "./pages/AdminHomePage";
import CordinaterAdminMainLayout from "./pages/CordinaterAdminMainLayout";
import RegistrationForm from "./components/form/RegistrationForm";
import LoginForm from "./components/form/LoginForm";
import AdminExaminerRegistration from "./pages/AdminExaminerRegistration";
import AdminExaminerTable from "./pages/AdminExaminerTable";
import GroupProfile from "./components/form/GroupProfile";
import UpdatePswrdForm from "./components/form/UpdatePswrdForm";
import ExaminerMainLayout from "./pages/ExaminerDashboardPages/ExaminerMainLayout";
import ExaminerviewDashboard from "./pages/ExaminerDashboardPages/ExaminerviewDashboard";
import StudentListAdmin from "./components/StudentListTable-AdminAssignExaminers/StudentListAdmin";
import AsignExaminerforGroup from "./pages/AsignExaminerforGroup";

import HomePage from '../src/pages/HomePage/Home';

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

          {/* Home Page route */}
          <Route path="/" element={<HomePage />} />

          <Route path="/admin-nav" element={<CordinaterAdminMainLayout />}>
            <Route index={true} path="" element={<AdminHomePage />} />
          </Route>
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/loginGrp" element={<LoginForm />} />

          <Route path="/getOneGroup/:grpId" element={<GroupProfile />} />
          <Route path="/updatePassword/:grpId" element={<UpdatePswrdForm />} />
          <Route
            path="/examiner-admin-table"
            element={<AdminExaminerTable />}
          />
          <Route
            path="/examiner-Asign-table"
            element={<AsignExaminerforGroup />}
          />
          <Route
            path="/examiner-registration-admin"
            element={<AdminExaminerRegistration />}
          />

          {/* examiner Route */}
          <Route path="/examiner-nav" element={<ExaminerMainLayout />}>
            <Route index={true} path="" element={<ExaminerviewDashboard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
