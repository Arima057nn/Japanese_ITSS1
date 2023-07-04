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

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const { user, loginContext } = useContext(UserContext);
  console.log("<<< user :", user);
  console.log("<<< token :", token);
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
        {/* 1 done*/}
        <Route path="/login" element={<Login />} />
        {/* 2 Quỳnh done*/}
        <Route path="/signup" element={<SignUp />} />
        {/* 3 Quỳnh done*/}
        <Route
          path="/home"
          element={
            role !== 1 && role !== 3 ? <HomeSearch /> : <h1>Not found</h1>
          }
        />
        {/* 4 Tú done*/}
        <Route
          path="/info/:id"
          element={
            role === "2" ? (
              <TeacherInfo />
            ) : (
              <h1>Khong the truy cap hay dang nhap voi vai tro la hoc sinh</h1>
            )
          }
        />
        {/* done */}
        <Route
          path="/profile"
          element={
            role === "3" ? (
              <TeacherProfile />
            ) : (
              <h1>Khong the truy cap hay dang nhap voi vai tro la giao vien</h1>
            )
          }
        />
        {/* done */}
        <Route
          path="/profile/setting"
          element={
            role === "3" ? (
              <TeacherProfileSetting />
            ) : (
              <h1>Khong the truy cap hay dang nhap voi vai tro la giao vien</h1>
            )
          }
        />
        {/* 7 Trưởng */}
        <Route path="/bookmarks" element={<BookmarkList />} />
        {/* 8 Tú*/}
        <Route path="/studentlist" element={<StudentList />} />
        {/* 9 Trung */}
        {/* <PrivateRoute path="/admin/manager" element={<UserList />} /> */}
        <Route
          path="/admin/manager"
          element={role === "1" ? <ManagerUser /> : <h1>Không thể truy cập</h1>}
        />
      </Routes>
    </Router>
  );
}

export default App;
