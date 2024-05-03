const express = require('express');
const router = express.Router();
const Supervisor = require('../model/supervisorModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register endpoint
router.post('/supervisor-register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if supervisor exists
    if (await Supervisor.findOne({ email })) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new supervisor
    const newSupervisor = new Supervisor({
      name, email, password: hashedPassword, role
    });

    await newSupervisor.save();

    res.status(201).json({ message: 'Supervisor registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
router.post('/supervisor-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find supervisor by email
    const supervisor = await Supervisor.findOne({ email });
    if (!supervisor) {
      return res.status(404).json({ message: 'Supervisor not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, supervisor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: supervisor._id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Prepare supervisor details to return, including the supervisor's ID and excluding sensitive data like password
    const supervisorData = {
      _id: supervisor._id,  // Including the supervisor's ID
      name: supervisor.name,
      email: supervisor.email,
      role: supervisor.role,
      engagedGroups: supervisor.engagedGroups,
      // You can include other non-sensitive fields as necessary
    };

    res.json({ token, supervisor: supervisorData });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
