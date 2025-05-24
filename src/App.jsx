import { Routes, Route } from "react-router-dom";
import Index from "./pages";
import EmpLogin from "./employer/auth/Login";
import EmpRegister from "./employer/auth/Register";
import StudentLogin from "./student/auth/Login";
import StudentRegister from "./student/auth/Register";
import UserProfile from "./student/pages/userProfile";
import ModernJobPortal from "./pages/ModernJobPortal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/employer/login" element={<EmpLogin />} />
        <Route path="/employer/register" element={<EmpRegister />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/jobs" element={<ModernJobPortal />} />
      </Routes>
    </>
  );
}

export default App;
