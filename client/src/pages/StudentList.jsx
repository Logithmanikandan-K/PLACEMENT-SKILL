
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function StudentList() {
    const [students, setStudents] = useState([]);

    const fetchStudents = async () => {
        try {
            const response = await API.get("/students");
            setStudents(response.data);
        } catch (error) {
            console.log("Error fetching students", error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const deleteStudent = async (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            try {
                await API.delete(`/students/${id}`);
                fetchStudents();
            } catch (error) {
                alert("Unable to delete student");
            }
        }
    };

    return (
        <div className="list-container">
            <h1>Student Skill List</h1>

            <Link to="/add" className="btn">
                Add New Student
            </Link>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Register Number</th>
                            <th>Department</th>
                            <th>Technical Skills</th>
                            <th>Aptitude</th>
                            <th>Communication</th>
                            <th>Placement Readiness</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map(student => (
                            <tr key={student._id}>
                                <td>{student.name}</td>
                                <td>{student.registerNumber}</td>
                                <td>{student.department}</td>
                                <td>{student.technicalSkills}</td>
                                <td>{student.aptitudeScore}</td>
                                <td>{student.communicationSkills}</td>
                                <td>{student.placementReadiness}</td>

                                <td>
                                    <Link
                                        to={`/edit/${student._id}`}
                                        className="edit"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => deleteStudent(student._id)}
                                        className="delete"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {students.length === 0 && (
                    <p className="empty">No student records available.</p>
                )}
            </div>
        </div>
    );
}

export default StudentList;
