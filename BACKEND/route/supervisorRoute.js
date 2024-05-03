const express = require("express");
const router = express.Router();
const supervisorController = require('../controller/supervisorController');
const assessMarksController = require("../controller/assessMarksController");

router.route("/register").post(supervisorController.createSupervisor);
router.route("/superviser-groups").post(supervisorController.getGroupsBySupervisor);

router.route("/get-supervisor/:id").get(supervisorController.fetchSingleSupervisor);
router.route("/get").get(supervisorController.fetchAllSupervisors);
router.route("/assign-group/:id").put(supervisorController.assignGroup);
router.route("/delete-supervisor/:id").delete(supervisorController.deleteSupervisor);
router.route("/assign-status1-marks").put(supervisorController.assignMarks);

router.route("/assignment-marks/:id").post(assessMarksController.assessmentMarks);
router.route("/assignment-marks/:id").get(assessMarksController.fetchAssessmentMarksbySupervisor);
router.route("/assignment-marks/group/:id").get(assessMarksController.fetchAssessmentMarksbyGroup);
router.route("/assignment-marks/group/:id").put(assessMarksController.updateAssessmentMarks);
router.route("/assignment-marks/group/:id").delete(assessMarksController.deleteAssessmentMarks);

module.exports = router;
