import React from "react";
import styles from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
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

import HomePage from "../src/pages/HomePage/Home";
import LoginCoordinator from "../src/components/form/ProjectCoordinatorLogin";
import CoodinatorDashboard from "../src/pages/ProjectCoordinator/DashboardPage";
import Assessments from "../src/pages/ProjectCoordinator/AssessmentsPage";
import MarkSheet from "../src/pages/ProjectCoordinator/MarkSheetPage";
import Presentations from "../src/pages/ProjectCoordinator/PresentationsPage";
import Projects from "../src/pages/ProjectCoordinator/ProjectsPage";
import Reports from "../src/pages/ProjectCoordinator/ReportsPage";
import ResearchPapers from "../src/pages/ProjectCoordinator/ResearchPaperPage";
import Rubric from "../src/pages/ProjectCoordinator/RubricPage";
import Teams from "../src/pages/ProjectCoordinator/TeamsPage";

import AddAssessment from "../src/pages/ProjectCoordinator/Forms/AssessmentForm";

import AsignExaminerIndividual from "./pages/AsignExaminerIndividual";

import ExaminerGroupList from "./pages/ExaminerDashboardPages/ExaminerGroupList";
import AssignMarksScreen from "./pages/ExaminerDashboardPages/AssignMarksScreen";
import Upload from "./components/form/Upload";
import AssignmentStatus from "./components/form/AssignmentStatus";
import UploadDoc2 from "./components/form/UploadDoc2";
import AssignmentStatusForDoc2 from "./components/form/AssignmentStatusForDoc2";
import StudentAndGroupManagementAdmin from "./components/StudentAndGroupManagement/StudentAndGroupManagementAdmin";
import SupervisorLogin from "./pages/supervisor/SupervisorLogin";
import SupervisorRegister from "./pages/supervisor/SupervisorRegistration";
import AssessmentTable from "./pages/supervisor/AssessmentTable";
import {
  AuthProvider,
  useAuth,
} from "./contexts/ProjectCoordinator/AuthContext";

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // Redirect them to the login page, but save the current location they were trying to go to
    return (
      <Navigate to="/supervisor-login" state={{ from: location }} replace />
    );
  }

  return children;
}

function App() {
  return (
    <div className={styles.App}>
      <AuthProvider>
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

            <Route path="/loginCoordinator" element={<LoginCoordinator />} />

            {/* Side Bar Project Coordinator */}

            <Route
              path="/coodinatorDashboard"
              element={<CoodinatorDashboard />}
            />
            <Route path="/Assessments" element={<Assessments />} />
            <Route path="/MarkSheet" element={<MarkSheet />} />
            <Route path="/Presentations" element={<Presentations />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Reports" element={<Reports />} />
            <Route path="/ResearchPapers" element={<ResearchPapers />} />
            <Route path="/Rubric" element={<Rubric />} />
            <Route path="/Teams" element={<Teams />} />

            <Route path="/AddAssessment" element={<AddAssessment />} />

            <Route path="/getOneGroup/:grpId" element={<GroupProfile />} />
            <Route
              path="/updatePassword/:grpId"
              element={<UpdatePswrdForm />}
            />
            <Route
              path="/examiner-admin-table"
              element={<AdminExaminerTable />}
            />
            <Route
              path="/examiner-Asign-table"
              element={<AsignExaminerforGroup />}
            />

            <Route
              path="/examiner-Asign"
              element={<AsignExaminerIndividual />}
            />

            <Route
              path="/examiner-registration-admin"
              element={<AdminExaminerRegistration />}
            />

            {/* examiner Route */}
            <Route path="/examiner-nav" element={<ExaminerMainLayout />}>
              <Route index={true} path="" element={<ExaminerviewDashboard />} />
            </Route>
            <Route
              path="/examiner-Group-List"
              element={<ExaminerGroupList />}
            />
            <Route
              path="/examiner-Asign-marks"
              element={<AssignMarksScreen />}
            />

            {/* Sachini */}

            <Route path="/Upload/:groupId" element={<Upload />} />
            <Route
              path="/AssignmentStatus/:groupId"
              element={<AssignmentStatus />}
            />
            <Route path="/UploadDoc2/:groupId" element={<UploadDoc2 />} />
            <Route
              path="/AssignmentStatusForDoc2/:groupId"
              element={<AssignmentStatusForDoc2 />}
            />

            <Route
              path="/student-group-management"
              element={<StudentAndGroupManagementAdmin />}
            />

            <Route path="/supervisor-login" element={<SupervisorLogin />} />
            <Route
              path="/supervisor-register"
              element={<SupervisorRegister />}
            />

            {/* Protected Routes for Supervisors */}
            <Route
              path="/supervisor/assessments"
              element={
                <ProtectedRoute>
                  <AssessmentTable />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
