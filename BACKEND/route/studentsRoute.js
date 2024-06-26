const router = require("express").Router();
const studentCntrl = require("../controller/studentController");

router.route("/registerGrp").post(studentCntrl.registerGroup);

router
  .route("/register-examiner")
  .post(studentCntrl.RegisterExaminerAsStudentUser);

//router.route("/displayAllGrp").get(studentCntrl.displayAllGroups);

router.route("/groups").get(studentCntrl.displayAllGroups);

router.route("/updateGrp/:grpId").put(studentCntrl.updateGroup);

router.route("/deleteGrp/:groupId").delete(studentCntrl.deleteGroup);

router.route("/getOneGroup/:grpId").get(studentCntrl.getOneGroup);

router.route("/loginGrp").post(studentCntrl.loginGroup);

router.route("/updatePassword/:grpId").put(studentCntrl.updatePassword);

router.route("/updateFunction/:grpId").post(studentCntrl.updateFunction);

router.route("/saveDownloadURLForDoc1/:groupId").post(studentCntrl.saveDownloadURLForDoc1);

router.route("/assignmentStatus/:groupId").get(studentCntrl.getAssignmentStatus);

router.route("/saveDownloadURLForDoc2/:groupId").post(studentCntrl.saveDownloadURLForDoc2);

router.route("/assignmentStatus2/:groupId").get(studentCntrl.getAssignmentStatus2);

module.exports = router;
