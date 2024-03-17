const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Group = require("../model/StudentModel");
const DeleteGroup = require("../model/DeleteGroupModel");

const registerGroup = async (req, res) => {
  console.log("Received request to /api/registerGrp");
  try {
    const { topic, supervisor, coSupervisor, members } = req.body;

    if (!members || members.length !== 4) {
      return res.status(400).json({
        status: "Error",
        message: "Exactly 4 members are required for group registration.",
      });
    }

    const groupId = await generateGroupId();

    const flattenedMembers = members.map((member, index) => ({
      ITNumber: member.ITNumber,
      nameAsRegistered: member.nameAsRegistered,
      email: member.email,
      phone: member.phone,
      specialization: member.specialization,
      labGroup: member.labGroup,
    }));

    const group = {
      groupId,
      topic,
      supervisor,
      coSupervisor,
      members: flattenedMembers,
      username: groupId,
      password: await bcrypt.hash(members[0].ITNumber, 10),
    };

    console.log("Generated groupId:", groupId);
    console.log("Generated username:", group.username);

    const newGroup = new Group(group);
    const savedGroup = await newGroup.save();

    res.status(201).json({ status: "Group Registered", group: savedGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "There is already registered student",
    });
  }
};

async function generateGroupId() {
  const latestGroup = await Group.findOne({}, {}, { sort: { groupId: -1 } });

  const currentYear = new Date().getFullYear();
  const lastGroupYear = latestGroup
    ? parseInt(latestGroup.groupId.split("_")[2])
    : 0;
  const lastGroupNumber = latestGroup
    ? parseInt(latestGroup.groupId.split("_")[3])
    : 0;

  const newYear = currentYear > lastGroupYear ? currentYear : lastGroupYear;

  const newGroupNumber = lastGroupNumber + 1;

  const newGroupId = `SLIIT_RP_${newYear}_${newGroupNumber
    .toString()
    .padStart(2, "0")}`;

  return newGroupId;
}

const displayAllGroups = (req, res) => {
  Group.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateGroup = async (req, res) => {
  try {
    const grpId = req.params.grpId;
    const { members } = req.body;

    if (!members || members.length !== 1) {
      return res.status(400).json({
        status: "Error",
        message: "Exactly 1 member is required for update.",
      });
    }

    const { ITNumber, email, phone } = members[0];

    const group = await Group.findOne({
      groupId: grpId,
      "members.ITNumber": ITNumber,
    });

    if (!group) {
      return res
        .status(404)
        .json({ status: "Error", message: "Group or member not found." });
    }

    const updatedGroup = await Group.findOneAndUpdate(
      { groupId: grpId, "members.ITNumber": ITNumber },
      { $set: { "members.$.email": email, "members.$.phone": phone } },
      { new: true }
    );

    res.status(200).json({ status: "Group Updated", group: updatedGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;

    if (!groupId) {
      return res
        .status(400)
        .send({ status: "Error", error: "Invalid groupId parameter" });
    }

    const groupToDelete = await Group.findOne({
      groupId: { $regex: new RegExp("^" + groupId + "$", "i") },
    });

    if (!groupToDelete) {
      return res.status(404).send({ status: "Group not found" });
    }

    // Save the group details to DeleteGroup table before deletion
    const deletedGroup = new DeleteGroup(groupToDelete.toJSON());
    await deletedGroup.save();

    // Delete the group from the original table
    const result = await Group.findOneAndDelete({
      groupId: { $regex: new RegExp("^" + groupId + "$", "i") },
    });

    if (result) {
      res.status(200).send({ status: "Group deleted" });
    } else {
      res.status(404).send({ status: "Group not found" });
    }
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send({ status: "Error with delete group", error: err.message });
  }
};

const getOneGroup = async (req, res) => {
  let grpId = req.params.grpId;
  try {
    const group = await Group.findOne({ groupId: grpId });
    if (!group) {
      return res.status(404).send({ status: "Group not found" });
    }
    res.status(200).send({ status: "Group fetched", group: group });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send({ status: "Error with get group", error: err.message });
  }
};

const loginGroup = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { username, password } = req.body;

    const group = await Group.findOne({ username });
    console.log("Retrieved Group:", group);
    console.log("Query:", { username });

    if (!group) {
      console.log("Invalid username");
      return res
        .status(401)
        .json({ status: "Error", message: "Invalid username or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, group.password);
    console.log("Is Password Valid:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Invalid password");
      return res
        .status(401)
        .json({ status: "Error", message: "Invalid username or password." });
    }

    const token = jwt.sign({ groupId: group.groupId }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(200).json({ status: "Login successful", group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { grpId } = req.params;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const group = await Group.findOne({ groupId: grpId });

    if (!group) {
      return res
        .status(404)
        .json({ status: "Error", message: "Group not found." });
    }

    console.log("Actual Password:", group.password);
    console.log("Current Password from Request:", currentPassword.trim());

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword.trim(),
      group.password
    );

    if (!isCurrentPasswordValid) {
      return res
        .status(401)
        .json({ status: "Error", message: "Invalid current password." });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: "Error",
        message: "New password and confirm password do not match.",
      });
    }

    group.password = await bcrypt.hash(newPassword, 10);
    await group.save();

    res.status(200).json({ status: "Password updated successfully", group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

const RegisterExaminerAsStudentUser = async (req, res, next) => {
  try {
    const { username, password, UserType } = req.body;
    console.log(username, password, UserType , fullname);


    const newUser = new Group({
      username,
      password: await bcrypt.hash(password, 10),
      UserType,
      fullname,
    });

    await newUser.save();

    res.status(201).json({
      message: "Examiner created successfully",
      newUser,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

const updateFunction = async (req, res) => {
    try {
        const { grpId } = req.params;
        const { memberIndex, functionDescription } = req.body;

        const group = await Group.findOne({ groupId: grpId });

        if (!group) {
            return res.status(404).json({ status: "Error", message: "Group not found." });
        }

        group.members[memberIndex].function = functionDescription;
        await group.save();

        const updatedGroup = await Group.findOne({ groupId: grpId });

        res.status(200).json({ status: "Function updated successfully", group: updatedGroup });
    } catch (error) {
        console.error('Error updating function:', error);
        res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
};

module.exports = {
  registerGroup,
  displayAllGroups,
  updateGroup,
  deleteGroup,
  getOneGroup,
  loginGroup,
  updatePassword,
  RegisterExaminerAsStudentUser,
    registerGroup,
    displayAllGroups,
    updateGroup,
    deleteGroup,
    getOneGroup,
    loginGroup,
    updatePassword,
    updateFunction,

};
