const mongoose = require("mongoose");
const { type } = require("os");

const Schema = mongoose.Schema;

const memberSchema = new Schema({
  ITNumber: {
    type: String,
  },
  nameAsRegistered: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  specialization: {
    type: String,
  },
  labGroup: {
    type: String,
  },
});

// const counterSchema = new Schema({
//   _id: { type: String, required: true },
//   seq: { type: Number, default: 1 },
// });

const groupSchema = new Schema(
  {
    groupId: {
      type: String,
    },
    topic: {
      type: String,
    },
    supervisor: {
      type: String,
    },
    coSupervisor: {
      type: String,
    },
    members: [memberSchema],

    username: {
      type: String,
    },
    password: {
      type: String,
    },
    UserType: {
      type: String,
      default: "Student",
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
