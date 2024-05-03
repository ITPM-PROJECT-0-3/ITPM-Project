const express = require("express");
const router = express.Router();
const ExaminerUser = require("../controller/ExaminerController");

router.route("/register").post(ExaminerUser.RegistraterExaminer);
router.route("/get-examiner/:id").get(ExaminerUser.fetchSingleExaminer);
router.route("/get-examiner-all").get(ExaminerUser.fetchAllExaminers);
router.route("/Asigne-group/:id").put(ExaminerUser.AsignStudentGroup);
router.route("/Asigne-proposal-marks/:id").put(ExaminerUser.AsignproposalMarks);
router.route("/delete-examiner/:id").delete(ExaminerUser.deleteExaminer);
router
  .route("/fetch-require-examiner-group")
  .get(ExaminerUser.fetchStudentGroupLessExaminers);

router
  .route("/CheckAssignStatus/:id")
  .post(ExaminerUser.CheckAssignExaminerInGroup);
router.route("/Asigne-Examiner/:id").put(ExaminerUser.AsignExaminerforGroup);
router
  .route("/fetch-group/:id")
  .get(ExaminerUser.fetchGrouplistUnderExaminerEmail);

router
  .route("/Asigne-progrees1-marks/:id")
  .put(ExaminerUser.AsignProgrees1MarksMarks);

router
  .route("/Asigne-progrees2-marks/:id")
  .put(ExaminerUser.AsignProgress2MarksMarks);

router
  .route("/Asigne-Final-marks/:id")
  .put(ExaminerUser.AsignFinalPresantationMarks);

router
  .route("/fetch-group-details/:groupId")
  .get(ExaminerUser.fetchGroupUseMongoId);

module.exports = router;
