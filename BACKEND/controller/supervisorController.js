const json = require("body-parser/lib/types/json");
const Supervisor = require("../model/StaffSupervisorModel");
const errorHandler = require("../utils/error");
const Group = require("../model/StudentModel");

const createSupervisor = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const existingSupervisor = await Supervisor.findOne({ email });

    if (existingSupervisor) {
      return res.status(400).json({
        status: "Supervisor Already Exist",
        error: "Email Is Already In Use",
      });
    }

    const newSupervisor = new Supervisor({ name, email });

    await newSupervisor.save();

    res.status(201).json({
      message: "Supervisor created successfully",
      newSupervisor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

const fetchSingleSupervisor = async (req, res, next) => {
  try {
    const supervisorId = req.params.id;

    const supervisorProfile = await Supervisor.findOne({ _id: supervisorId });

    if (!supervisorProfile) {
      return res.status(404).json({
        status: "Error",
        message: "Supervisor Profile not found for the given ID.",
      });
    }
    res.status(200).json({
      status: "Supervisor Details Fetched",
      supervisorProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

const fetchAllSupervisors = async (req, res, next) => {
  try {
    const allSupervisors = await Supervisor.find();
    res.status(200).json({
      status: "fetch All Details",
      allSupervisors,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(error));
    res
      .status(500)
      .send({ status: "Error fetching Supervisors", error: error.message });
  }
};

const assignGroup = async (req, res, next) => {
  try {
    const supervisorId = req.params.id;
    const { groupDetails } = req.body;

    const supervisor = await Supervisor.findById(supervisorId);

    if (!supervisor) {
      return res.status(404).json({
        status: "Supervisor not found",
        message: "No Supervisor found with the specified ID.",
      });
    }

    groupDetails.forEach((newGroup) => {
      supervisor.engagedGroups.push(newGroup);
    });

    const updatedSupervisor = await supervisor.save();

    res.status(200).json({
      status: "Success",
      message: "Groups assigned successfully.",
      updatedSupervisor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

const deleteSupervisor = async (req, res, next) => {
  try {
    const supervisorId = req.params.id;

    const supervisor = await Supervisor.findById(supervisorId);
    if (!supervisor) {
      return res.status(404).send({ status: "Supervisor not found" });
    }

    await Supervisor.findByIdAndDelete(supervisorId);

    res.status(200).send({ status: "Supervisor Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};



const assignMarks = async (req, res, next) => {
  try {
    const { groupId, supervisorEmail, marks } = req.body;

    // Find the group
    const group = await Group.findById(groupId);

    // Check if group exists
    if (!group) {
      return res.status(404).json({
        status: "Error",
        message: "Group not found with the specified ID.",
      });
    }

    // Find the supervisor in the group
    const supervisor = group.SupervisorDetails.find(
      (supervisor) => supervisor.email === supervisorEmail
    );

    // Check if supervisor exists
    if (!supervisor) {
      return res.status(404).json({
        status: "Error",
        message: "Supervisor not found with the specified email in the group.",
      });
    }

    // Add marks to the supervisor
    supervisor.Marks.push({ marks });

    // Save the updated group
    const updatedGroup = await group.save();

    res.status(200).json({
      status: "Success",
      message: "Marks assigned successfully.",
      updatedGroup,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};



module.exports = {
  createSupervisor,
  fetchSingleSupervisor,
  fetchAllSupervisors,
  assignGroup,
  deleteSupervisor,
  assignMarks,
};
