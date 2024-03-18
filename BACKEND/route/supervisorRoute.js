
const express = require("express");
const router = express.Router();
const supervisorController = require("../controller/supervisorController");


// Create a new supervisor
router.route('/add').post(supervisorController.createSupervisor);
router.route('/get/:name').get(supervisorController.getSupervisorGroups);

router.route('/get').get(supervisorController.getSupervisors);


module.exports = router;
