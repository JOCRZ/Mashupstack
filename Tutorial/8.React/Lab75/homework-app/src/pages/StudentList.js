import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function StudentList() {
  const [students, setStudents] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get('https://worksheet-student.mashupstack.com/students', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : (res.data.students || []);
        setStudents(data);
      })
      .catch((err) => {
        const msg = err.response?.data?.message || err.message || 'Failed to fetch students';
        alert(msg);
      });
  }, [token]);

  return (
    <div className="container">
      <div className="card">
        <div className="page-header">
          <h2>Student List</h2>
        </div>
        {students.length === 0 ? (
          <p className="empty-state">No students found.</p>
        ) : (
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StudentList;
