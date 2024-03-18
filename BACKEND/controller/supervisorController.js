
const Group = require('../model/StudentModel');
const Supervisor = require('../model/StaffSupervisorModel');


const createSupervisor = async (req, res) => {
    try {
      const { name, email } = req.body;
      const supervisor = new Supervisor({
       name,
       email,
      });
      const savedSupervisor= await supervisor.save();
      res.status(201).json(savedSupervisor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

  const getSupervisors = async (req, res) => {
    try {
      // Assuming supervisor names are stored in the student model under the 'supervisor' field
      const supervisors = await Group.distinct('supervisor');
  
      // Fetch relevant groups for each supervisor
      const supervisorsWithGroups = [];
  
      for (const supervisor of supervisors) {
        const groups = await Group.find({ supervisor: supervisor });
        supervisorsWithGroups.push({ supervisor, groups });
      }
  
      res.status(200).json(supervisorsWithGroups);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



  const getSupervisorGroups = async (req, res) => {
    try {
      const supervisorName = req.params.supervisorName;
  
      const groups = await Group.find({ supervisor: supervisorName });
  
      if (!groups || groups.length === 0) {
        return res.status(404).json({ error: 'No groups found for the supervisor' });
      }
  
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };




module.exports = {
  
  createSupervisor,
  getSupervisors,
  getSupervisorGroups,

};
