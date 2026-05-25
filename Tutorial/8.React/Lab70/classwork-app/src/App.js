import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
    const navigate = useNavigate();
    const students = [
        'Eren Yeager',
        'Mikasa Ackerman',
        'Armin Arlert',
        'Levi Ackerman',
        'Riya',
    ];

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h1 className="text-center mb-4">Student List</h1>
                <ul className="list-group">
                    {students.map((student) => (
                        <li
                            key={student}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            {student}
                            <Link
                                to={`/student/${student}`}
                                className="btn btn-primary"
                            >
                                Select
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="text-center mt-4">
                    <button
                        className="btn btn-success btn-lg"
                        onClick={() => navigate('/student/Riya')}
                    >
                        Go to Riya
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
