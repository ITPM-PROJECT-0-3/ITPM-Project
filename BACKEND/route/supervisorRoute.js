const express = require("express");
const router = express.Router();
const SupervisorController = require("../controller/SupervisorController");

router.route("/register").post(SupervisorController.createSupervisor);
router.route("/get-supervisor/:id").get(SupervisorController.fetchSingleSupervisor);
router.route("/get-all-supervisors").get(SupervisorController.fetchAllSupervisors);
router.route("/assign-group/:id").put(SupervisorController.assignGroup);
router.route("/delete-supervisor/:id").delete(SupervisorController.deleteSupervisor);
router.route("/assign-status1-marks/:id").put(SupervisorController.assignMarks);

module.exports = router;
