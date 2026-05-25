import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function StudentProfile() {
    const { name } = useParams();
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow text-center">
                <h1>Welcome, {name}!</h1>
                <button
                    className="btn btn-secondary mt-3"
                    onClick={() => navigate('/')}
                >
                    Back to Student List
                </button>
            </div>
        </div>
    );
}

export default StudentProfile;
