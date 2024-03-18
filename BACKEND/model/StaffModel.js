const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    position: {
      type: String,
    },
    
    department: {
      type: String,
    },
    email: {
      type: String,
    },
    Phone: {
      type: String,
    },
    
  },
 
);

const staffUser = mongoose.model("staffUser", staffSchema);

module.exports = staffUser;
