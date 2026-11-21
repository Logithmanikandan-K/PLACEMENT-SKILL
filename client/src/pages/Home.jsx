
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home">
            <h1>Placement Student Skills Management System</h1>

            <p>
                Manage student technical skills, aptitude scores,
                communication skills and placement readiness.
            </p>

            <div className="home-buttons">
                <Link to="/add" className="btn">
                    Add Student Skills
                </Link>

                <Link to="/students" className="btn secondary">
                    View Student List
                </Link>
            </div>

            <div className="features">
                <div className="feature">
                    <h3>Add Student</h3>
                    <p>Enter student skill assessment details.</p>
                </div>

                <div className="feature">
                    <h3>View Skills</h3>
                    <p>View all registered student records.</p>
                </div>

                <div className="feature">
                    <h3>Manage Records</h3>
                    <p>Update or delete student information.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
