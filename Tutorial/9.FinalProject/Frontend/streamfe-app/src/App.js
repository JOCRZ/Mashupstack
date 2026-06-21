import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Landing from "./pages/landing";
import Home from "./pages/home";
import ProfileSection from "./components/ProfileSection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfileSection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
