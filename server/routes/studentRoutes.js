
const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// POST - Add student
router.post("/", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();

        res.status(201).json({
            message: "Student added successfully",
            student
        });
    } catch (error) {
        res.status(400).json({
            message: error.code === 11000
                ? "Register number already exists"
                : error.message
        });
    }
});

// GET - Retrieve all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET - Retrieve one student
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);
    } catch (error) {
        res.status(400).json({ message: "Invalid student ID" });
    }
});

// PUT - Update student
router.put("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student updated successfully",
            student
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE - Remove student
router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(400).json({ message: "Invalid student ID" });
    }
});

module.exports = router;
