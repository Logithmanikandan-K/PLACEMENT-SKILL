import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../App";

function AddStudent() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        name: "",
        registerNumber: "",
        department: "",
        technicalSkills: "",
        aptitudeScore: "",
        communicationSkills: "",
        placementReadiness: "In Progress"
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!id) return;

        fetch(`${API_URL}/students/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load student");
                return res.json();
            })
            .then((data) => setForm(data))
            .catch(() => setMessage("Unable to load student"));
    }, [id]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const payload = {
                ...form,
                aptitudeScore: Number(form.aptitudeScore)
            };

            const url = id ? `${API_URL}/students/${id}` : `${API_URL}/students`;
            const method = id ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(result.message || "Error saving student");
            }

            navigate("/students");
        } catch (error) {
            setMessage(error.message || "Error saving student");
        }
    };

    return (
        <div className="form-container">
            <h1>{id ? "Update Student Skills" : "Add Student Skills"}</h1>

            <form onSubmit={handleSubmit}>
                <label>Student Name</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter student name"
                    required
                />

                <label>Register Number</label>
                <input
                    type="text"
                    name="registerNumber"
                    value={form.registerNumber}
                    onChange={handleChange}
                    placeholder="Enter register number"
                    required
                />

                <label>Department</label>
                <input
                    type="text"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="Enter department"
                    required
                />

                <label>Technical Skills</label>
                <textarea
                    name="technicalSkills"
                    value={form.technicalSkills}
                    onChange={handleChange}
                    placeholder="Example: Java, React, HTML, CSS"
                    required
                />

                <label>Aptitude Score (0-100)</label>
                <input
                    type="number"
                    name="aptitudeScore"
                    min="0"
                    max="100"
                    value={form.aptitudeScore}
                    onChange={handleChange}
                    required
                />

                <label>Communication Skills</label>
                <select
                    name="communicationSkills"
                    value={form.communicationSkills}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Level</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Needs Improvement">Needs Improvement</option>
                </select>

                <label>Placement Readiness</label>
                <select
                    name="placementReadiness"
                    value={form.placementReadiness}
                    onChange={handleChange}
                >
                    <option value="Ready">Ready</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Not Ready">Not Ready</option>
                </select>

                <button type="submit" className="btn">
                    {id ? "Update Student" : "Save Student"}
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default AddStudent;
