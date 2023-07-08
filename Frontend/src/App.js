import Login from "./pages/Login";
import HomeSearch from "./pages/HomeSearch";
import BookmarkList from "./pages/Student/BookmarkList";
import StudentList from "./pages/Teacher/StudentList";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import TeacherInfo from "./pages/Teacher/TeacherInfo";
import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import ManagerUser from "./pages/Admin/ManagerUser";
import TeacherProfile from "./pages/Teacher/TeacherProfile";
import TeacherProfileSetting from "./pages/Teacher/TeacherProfileSetting";
import TeacherProfileCreate from "./pages/Teacher/TeacherProfileCreate";
import { toast } from "react-toastify";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const { user, loginContext } = useContext(UserContext);
  console.log("<<< user :", user);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(
        localStorage.getItem("username"),
        localStorage.getItem("token"),
        parseInt(localStorage.getItem("role")),
        parseInt(localStorage.getItem("id"))
      );
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
            role !== 1 && role !== 3 ? <HomeSearch /> : <h1>Not found</h1>
          }
        />
        <Route
          path="/info/:id"
          element={role === "2" ? <TeacherInfo /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={role === "3" ? <TeacherProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/setting"
          element={
            role === "3" ? <TeacherProfileSetting /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/profile/create"
          element={
            role === "3" ? <TeacherProfileCreate /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/bookmarks"
          element={role === "2" ? <BookmarkList /> : <Navigate to="/login" />}
        />
        <Route
          path="/studentlist"
          element={role == "3" ? <StudentList /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/manager"
          element={role === "1" ? <ManagerUser /> : <h1>Không thể truy cập</h1>}
        />
      </Routes>
    </Router>
  );
}

export default App;
