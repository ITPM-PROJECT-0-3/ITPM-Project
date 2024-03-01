const router = require("express").Router();
const studentCntrl = require("../controller/studentController");

router.route("/registerGrp").post(studentCntrl.registerGroup);

router.route("/displayAllGrp").get(studentCntrl.displayAllGroups);

router.route("/updateGrp/:grpId").put(studentCntrl.updateGroup);

router.route("/deleteGrp/:groupId").delete(studentCntrl.deleteGroup);

router.route("/getOneGroup/:grpId").get(studentCntrl.getOneGroup);

module.exports = router;
