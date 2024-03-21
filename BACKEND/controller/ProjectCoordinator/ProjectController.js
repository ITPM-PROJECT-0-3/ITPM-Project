const Project = require('../models/Project');

// Create a new project
exports.createProject = async (req, res) => {
    const { title, description, teamMembers, status } = req.body;

    try {
        const newProject = new Project({
            title,
            description,
            teamMembers, // Assume this is an array of user IDs
            status
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Server error while creating project' });
    }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('teamMembers', 'name');
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Server error while fetching projects' });
    }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id).populate('teamMembers', 'name');

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ message: 'Server error while fetching project' });
    }
};

// Update a project
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Server error while updating project' });
    }
};

// Delete a project
exports.deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({ message: 'Project successfully deleted' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ message: 'Server error while deleting project' });
    }
};
