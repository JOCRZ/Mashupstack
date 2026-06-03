import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import StudentList from './pages/StudentList';
import checkAuth from './components/checkAuth';
import './App.css';

const ProtectedStudentList = checkAuth(StudentList);

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedStudentList />} />
      </Routes>
    </>
  );
}

export default App;
