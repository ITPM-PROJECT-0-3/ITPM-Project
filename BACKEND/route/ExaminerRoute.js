const express = require("express");
const router = express.Router();
const ExaminerUser = require("../controller/ExaminerController");

router.route("/register").post(ExaminerUser.RegistraterExaminer);
router.route("/get-examiner/:id").get(ExaminerUser.fetchSingleExaminer);
router.route("/get-examiner-all").get(ExaminerUser.fetchAllExaminers);

module.exports = router;
