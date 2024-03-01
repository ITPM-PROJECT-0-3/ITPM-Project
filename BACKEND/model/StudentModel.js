const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memberSchema = new Schema({
    ITNumber: {
        type: String,
        required: true,
        unique: true
    },
    nameAsRegistered: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    labGroup: {
        type: String
    },
    password: {
        type: String,
    }
});

const groupSchema = new Schema({
    groupId: {
        type: String,
        unique: true
    },
    topic: {
        type: String,
        required: true
    },
    supervisor: {
        type: String,
        required: true
    },
    coSupervisor: {
        type: String,
        required: true
    },
    members: [memberSchema],
});

/*
groupSchema.pre('save', async function (next) {
    try {
        // Check the count of existing documents and increment by 1
        const groupCount = await Group.countDocuments({});
        const currentYear = new Date().getFullYear();
        const groupNumber = (groupCount + 1).toString().padStart(2, '0');

        // Generate the groupId
        this.groupId = `SLIIT_RP_${currentYear}_${groupNumber}`;
        next();
    } catch (error) {
        next(error);
    }
});
*/

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
