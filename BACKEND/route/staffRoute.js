const express = require("express");
const router = express.Router();
const staffController = require("../controller/staffController");

/// Create a new stock
router.route('/add').post(staffController.createStaffUser);
router.route('/get').get(staffController.getAllStaffUsers);
router.route('/get/:id').put(staffController.getStaffUserById);
router.route('/update/:id').get(staffController.updateStaffUserById);
router.route('/delete/:id').delete(staffController.deleteStaffUserById);



module.exports = router;
