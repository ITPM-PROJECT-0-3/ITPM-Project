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
  functionDescription: {
    type: String,
  },
});
const proposalMarksSchema = new Schema({
  StudentID :String,
  clarity: String, // Clarity of the proposal
  relevance: String, // Relevance to the topic
  methodology: String, // Soundness of the proposed methodology
  originality: String, // Originality of the proposal
  feasibility: String, // Feasibility of the proposed work
});
const progree1MarksSchema = new Schema({
  StudentID :String,
  progress: String, // Progress made since the proposal stage
  adherence: String, // Adherence to project timeline
  problemSolving: String, // Ability to overcome challenges
  communication: String, // Effectiveness of communication
  collaboration: String, // Collaboration with others (if applicable)
});
const progress2MarksSchema = new Schema({
  StudentID :String,
  progress: String, // Progress made since the first evaluation
  adherence: String, // Continued adherence to project timeline
  problemSolving: String, // Further ability to overcome challenges
  dataAnalysis: String, // Quality of data analysis
  resultsInterpretation: String, // Quality of results interpretation
});
const FinalPresantationMarksSchema = new Schema({
  StudentID :String,
  content: String, // Relevance and depth of content
  organization: String, // Clarity and organization of presentation
  delivery: String, // Delivery and presentation skills
  visuals: String, // Effectiveness of visual aids (if applicable)
  QnA: String, // Ability to handle questions and answers
});

const marksSchema = new Schema({
  proposalMarks: [proposalMarksSchema],
  progreel1Marks: [progree1MarksSchema],
  progress2Marks: [progress2MarksSchema],
  FinalPresantationMarks: [FinalPresantationMarksSchema],
});

const examinerSchema = new Schema({
  ExaminerID: {
    type: String,
  },
  FullName: {
    type: String,
  },
  Email: {
    type: String,
  },
  HeldingDate: {
    type: String,
  },
  Time: {
    type: String,
  },
  Marks: [marksSchema],
});

const supervisorSchema = new Schema({
  SupervisorID: {
    type: String,
  },
  FullName: {
    type: String,
  },
  Email: {
    type: String,
  },
  Marks: [marksSchema], 
});


const cosupervisorSchema = new Schema({
  CoSupervisorID: {
    type: String,
  },
  FullName: {
    type: String,
  },
  Email: {
    type: String,
  },
  Marks: [marksSchema], // Include marks for reports
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
    downloadURLForDoc1: {
      type: String
    },
    downloadURLForDoc2: {
      type: String
    },
    ExaminerDetails: [examinerSchema],
    SupervisorDetails: [supervisorSchema],
    CoSupervisorDetails: [cosupervisorSchema],
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
