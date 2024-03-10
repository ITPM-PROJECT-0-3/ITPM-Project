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
});

const counterSchema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 1 }
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
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
