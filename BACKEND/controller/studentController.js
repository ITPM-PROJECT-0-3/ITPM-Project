const Group = require("../model/StudentModel");

const registerGroup = async (req, res) => {
    try {
        const {
            topic,
            supervisor,
            coSupervisor,
            members,
        } = req.body;

        if (!members || members.length !== 4) {
            return res.status(400).json({ status: "Error", message: "Exactly 4 members are required for group registration." });
        }

        /*const currentYear = new Date().getFullYear();
        const groupCount = await Group.countDocuments({}); 
        const groupNo = groupCount + 1;

        const groupId = `SLIIT_RP_${currentYear}_${groupNo}`;
        */

        const groupId = await generateGroupId();

        // Flatten the members array and include specific fields
        const flattenedMembers = members.map((member, index) => ({
            ITNumber: member.ITNumber,
            nameAsRegistered: member.nameAsRegistered,
            email: member.email,
            phone: member.phone,
            specialization: member.specialization,
            labGroup: member.labGroup,
            // You can include other member details here as needed
        }));

        // Create the group object with details
        const group = {
            groupId,
            topic,
            supervisor,
            coSupervisor,
            members: flattenedMembers,
        };

        // Save the group to the database
        const newGroup = new Group(group);  // Corrected name here
        const savedGroup = await newGroup.save();

        res.status(201).json({ status: "Group Registered", group: savedGroup });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
};

// Function to generate the custom group ID
async function generateGroupId() {
    // Find the latest group in the database to determine the next ID
    const latestGroup = await Group.findOne({}, {}, { sort: { 'groupId': -1 } });

    // Extract the year and number from the latest group's ID
    const currentYear = new Date().getFullYear();
    const lastGroupYear = latestGroup ? parseInt(latestGroup.groupId.split('_')[2]) : 0;
    const lastGroupNumber = latestGroup ? parseInt(latestGroup.groupId.split('_')[3]) : 0;

    // Check if the current year is the same as the last group's year
    const newYear = currentYear > lastGroupYear ? currentYear : lastGroupYear;

    // Generate the next group number
    const newGroupNumber = lastGroupNumber + 1;

    // Format the new group ID
    const newGroupId = `SLIIT_RP_${newYear}_${newGroupNumber.toString().padStart(2, '0')}`;

    return newGroupId;
}

const displayAllGroups = (req, res) => {
    Group.find().then((students) => {
        res.json(students);
    }).catch((err) => {
        console.log(err);
    });
};

const updateGroup = async (req, res) => {
    try {
        const grpId = req.params.grpId;
        const { members } = req.body;

        // Ensure members array is provided
        if (!members || members.length !== 1) {
            return res.status(400).json({ status: "Error", message: "Exactly 1 member is required for update." });
        }

        const { ITNumber, email, phone } = members[0];

        // Find the group by groupId and the member by ITNumber
        const group = await Group.findOne({ "groupId": grpId, "members.ITNumber": ITNumber });

        if (!group) {
            return res.status(404).json({ status: "Error", message: "Group or member not found." });
        }

        // Update the email and phone of the matching member
        const updatedGroup = await Group.findOneAndUpdate(
            { "groupId": grpId, "members.ITNumber": ITNumber },
            { "$set": { "members.$.email": email, "members.$.phone": phone } },
            { new: true }
        );

        res.status(200).json({ status: "Group Updated", group: updatedGroup });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
};
/*
const deleteGroup = async (req, res) => {
    let groupId = req.params.groupId;

    await Group.findOneAndDelete({ groupId: groupId }).then(() => {
        res.status(200).send({ status: "Group deleted" });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete group", error: err.message });
    });
};
*/

const deleteGroup = async (req, res) => {
    try {
        // Extract groupId from the request parameters
        const groupId = req.params.groupId;

        if (!groupId) {
            return res.status(400).send({ status: "Error", error: "Invalid groupId parameter" });
        }

        // Use a case-insensitive search to match the exact format and case
        const result = await Group.findOneAndDelete({ groupId: { $regex: new RegExp('^' + groupId + '$', 'i') } });

        if (result) {
            res.status(200).send({ status: "Group deleted" });
        } else {
            res.status(404).send({ status: "Group not found" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete group", error: err.message });
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
        res.status(500).send({ status: "Error with get group", error: err.message });
    }
};

module.exports = {
    registerGroup,
    displayAllGroups,
    updateGroup,
    deleteGroup,
    getOneGroup,
};
