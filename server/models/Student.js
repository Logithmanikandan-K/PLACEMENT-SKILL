
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    registerNumber: {
        type: String,
        required: true,
        unique: true
    },

    department: {
        type: String,
        required: true
    },

    technicalSkills: {
        type: String,
        required: true
    },

    aptitudeScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },

    communicationSkills: {
        type: String,
        required: true
    },

    placementReadiness: {
        type: String,
        enum: ["Ready", "In Progress", "Not Ready"],
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);