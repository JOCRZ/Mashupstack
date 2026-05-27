import { useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', rollNumber: '', class: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', rollNumber: '', class: '' });
  const [errors, setErrors] = useState({});

  const validateForm = (data, isEdit = false) => {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = 'Name is required';
    if (!data.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required';
    if (!data.class.trim()) newErrors.class = 'Class is required';

    if (data.rollNumber.trim()) {
      const duplicate = students.find(
        s => s.rollNumber.toLowerCase() === data.rollNumber.trim().toLowerCase() &&
          (isEdit ? s.id !== editingId : true)
      );
      if (duplicate) newErrors.rollNumber = 'Roll number must be unique';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const newStudent = {
      id: students.length + 1,
      name: formData.name.trim(),
      rollNumber: formData.rollNumber.trim(),
      class: formData.class.trim(),
    };

    setStudents([...students, newStudent]);
    setFormData({ name: '', rollNumber: '', class: '' });
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditFormData({
      name: student.name,
      rollNumber: student.rollNumber,
      class: student.class,
    });
    setErrors({});
  };

  const handleSave = () => {
    const validationErrors = validateForm(editFormData, true);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStudents(students.map(s =>
      s.id === editingId
        ? { ...s, name: editFormData.name.trim(), rollNumber: editFormData.rollNumber.trim(), class: editFormData.class.trim() }
        : s
    ));
    setEditingId(null);
    setEditFormData({ name: '', rollNumber: '', class: '' });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditFormData({ name: '', rollNumber: '', class: '' });
    setErrors({});
  };

  const handleDelete = (id) => {
    setStudents(students.filter(s => s.id !== id));
    if (editingId === id) handleCancel();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: undefined });
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Student List Management</h1>

      <form onSubmit={handleSubmit} className="student-form">
        <h2>Add New Student</h2>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="rollNumber"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
          />
          {errors.rollNumber && <span className="error">{errors.rollNumber}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="class"
            placeholder="Class (e.g., 10A)"
            value={formData.class}
            onChange={handleChange}
          />
          {errors.class && <span className="error">{errors.class}</span>}
        </div>
        <button type="submit">Add Student</button>
      </form>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredStudents.length === 0 ? (
        <p className="no-students">No students found</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Class</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                {editingId === student.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                      />
                      {errors.name && <span className="error">{errors.name}</span>}
                    </td>
                    <td>
                      <input
                        type="text"
                        name="rollNumber"
                        value={editFormData.rollNumber}
                        onChange={handleEditChange}
                      />
                      {errors.rollNumber && <span className="error">{errors.rollNumber}</span>}
                    </td>
                    <td>
                      <input
                        type="text"
                        name="class"
                        value={editFormData.class}
                        onChange={handleEditChange}
                      />
                      {errors.class && <span className="error">{errors.class}</span>}
                    </td>
                    <td>
                      <button onClick={handleSave} className="btn-save">Save</button>
                      <button onClick={handleCancel} className="btn-cancel">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{student.name}</td>
                    <td>{student.rollNumber}</td>
                    <td>{student.class}</td>
                    <td>
                      <button onClick={() => handleEdit(student)} className="btn-edit">Edit</button>
                      <button onClick={() => handleDelete(student.id)} className="btn-delete">Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
