
import { Link, Routes, Route, NavLink } from "react-router-dom";

import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import StudentList from "./pages/StudentList";

export const API_URL =
  import.meta.env.VITE_API_URL || "https://placement-skill-tprr.onrender.com/api";
function App() {
    return (
        <div>
            <header className="navbar">
                <h2>Placement Skills</h2>

                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/add">Add Student Skills</NavLink>
                    <NavLink to="/students">Student Skill List</NavLink>
                </nav>
            </header>

            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add" element={<AddStudent />} />
                    <Route path="/edit/:id" element={<AddStudent />} />
                    <Route path="/students" element={<StudentList />} />
                </Routes>
            </main>

            <footer>
                Placement Student Skills Management System
            </footer>
        </div>
    );
}

export default App;
