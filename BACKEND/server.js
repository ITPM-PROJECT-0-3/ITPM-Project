const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
var morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require('helmet');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(express.json());

const URL = process.env.MONGODB_URL;

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connection Success! 🚀");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

const studentRouter = require("./route/studentsRoute.js");
app.use("/student", studentRouter);

const ExaminerRouter = require("./route/ExaminerRoute.js");
app.use("/api/examiner", ExaminerRouter);

const staffRouter = require("./route/staffRoute.js");
app.use("/staff", staffRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});


// Import route modules
const assessmentRoutes = require('./route/ProjectCoordinator/AssessmentRoutes.js');
const markSheetRoutes = require('./route/ProjectCoordinator/MarkSheetRoutes.js');
const presentationRoutes = require('./route/ProjectCoordinator/PresentationRoutes.js');
const projectRoutes = require('./route/ProjectCoordinator/ProjectRoutes.js');
const reportRoutes = require('./route/ProjectCoordinator/ReportRoutes.js');
const researchPaperRoutes = require('./route/ProjectCoordinator/ResearchPaperRoutes.js');
const rubricRoutes = require('./route/ProjectCoordinator/RubricRoutes.js');
const scheduleRoutes = require('./route/ProjectCoordinator/ScheduleRoutes.js');
const teamRoutes = require('./route/ProjectCoordinator/TeamRoutes.js');
const userRoutes = require('./route/ProjectCoordinator/UserRoutes.js');

// Use routes
app.use('/api/assessments', assessmentRoutes);
app.use('/api/mark-sheet', markSheetRoutes);
app.use('/api/presentations', presentationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/research-papers', researchPaperRoutes);
app.use('/api/rubric', rubricRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/users', userRoutes);

app.post('/api/login', login);

// A simple route for the root path to verify the server is running
app.get('/', (req, res) => {
  res.send('API is running...');
});






