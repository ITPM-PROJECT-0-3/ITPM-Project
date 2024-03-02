const express = require("express");
const router = express.Router();
const ExaminerUser = require("../controller/ExaminerController");

router.route("/register").post(ExaminerUser.RegistraterExaminer);
router.route("/get-examiner").post(ExaminerUser.fetchSingleExaminer);

module.exports = router;
