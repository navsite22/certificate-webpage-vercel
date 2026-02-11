
import mongoose from "mongoose";

// name: String,
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // age: Number
const userSchema = new mongoose.Schema(
  {
    "Name": {
      type: String,
      required: true,
      trim: true
    },
    "Mother's Name": {
      type: String,
      required: true,
      trim: true
    },
    "Father's Name": {
      type: String,
      required: true,
      trim: true
    },
    "Navprayas Joining Year": {
      type: Number,
      required: true
    },
    "Contribution": {
      type: String,
      required: true
    },
    "Capacity": {
      type: String,
      enum: ["Team Member", "Team Lead", "Coordinator", "Volunteer"],
      default: "Team Member"
    },
    "Mode of Contribution": {
      type: String,
      enum: ["Offline", "Online", "Hybrid"],
      required: true
    },
    certificateNo: {
      type: String,
      unique: true,
      required: true
    },
    membershipNo: {
      type: String,
      unique: true,
      required: true
    }
    }, {
      timestamps: true,
      collection: 'certificate-details'
});

export default mongoose.model('User', userSchema);