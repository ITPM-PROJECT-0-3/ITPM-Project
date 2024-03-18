const StaffUser = require("../model/StaffModel");

const createStaffUser = async (req, res) => {
  try {
    const { firstName, lastName,position, department, email, phone } = req.body;
    const staffUser = new StaffUser({
      firstName,
      lastName,
      position,
      department,
      email,
      phone,
    });
    const savedStaffUser = await staffUser.save();
    res.status(201).json(savedStaffUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllStaffUsers = async (req, res) => {
  try {
    const staffUsers = await StaffUser.find();
    res.json(staffUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getStaffUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const staffUser = await StaffUser.findById(id);
    if (!staffUser) {
      return res.status(404).json({ error: "Staff user not found" });
    }
    res.json(staffUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateStaffUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStaffUser = await StaffUser.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedStaffUser) {
      return res.status(404).json({ error: "Staff user not found" });
    }
    res.json(updatedStaffUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteStaffUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStaffUser = await StaffUser.findByIdAndDelete(id);
    if (!deletedStaffUser) {
      return res.status(404).json({ error: "Staff user not found" });
    }
    res.json({ message: "Staff user deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createStaffUser,
  getAllStaffUsers,
  getStaffUserById,
  updateStaffUserById,
  deleteStaffUserById,
};
