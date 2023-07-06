import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Avatar } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Dropdown, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const cx = classNames.bind(styles);

function Header() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("ログアウトしました !");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Link
          to={user.role === 3 ? "/profile" : "/home"}
          style={{ color: "#333", textDecoration: "none" }}
        >
          <div className={cx("logo")}>Vlearn</div>
        </Link>
        <div className={cx("option")}>
          <NotificationsNoneIcon sx={{ fontSize: 40 }} />
          {/* {token && user.name && <h4>{user.name}</h4>} */}
          <Avatar
            alt="Remy Sharp"
            src={
              !token
                ? "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                : user.role === 3
                ? "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                : "https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=826"
            }
            sx={{ width: 48, height: 48, margin: "0 0 0 12px" }}
          />

          <NavDropdown style={{ marginLeft: 4, fontSize: 20 }}>
            {token && user && (
              <Dropdown.ItemText
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  borderBottom: "1px soild red",
                  backgroundColor: "#E4DCCF",
                }}
              >
                <AccountCircleIcon /> {user.username}
              </Dropdown.ItemText>
            )}
            {!token && (
              <NavDropdown.Item href="/login">
                <NavLink to="/login" className="nav-link">
                  ログイン
                </NavLink>
              </NavDropdown.Item>
            )}

            {!token && (
              <NavDropdown.Item href="/signup">
                <NavLink to="/signup" className="nav-link">
                  サインアップ
                </NavLink>
              </NavDropdown.Item>
            )}
            {token && user.role === 3 && (
              <NavDropdown.Item href="/profile">
                <NavLink to="/profile" className="nav-link">
                  プロフィール
                </NavLink>
              </NavDropdown.Item>
            )}

            {token && user.role === 3 && (
              <NavDropdown.Item href="/studentlist">
                <NavLink to="/studentlist" className="nav-link">
                  学生リスト
                </NavLink>
              </NavDropdown.Item>
            )}
            {token && user.role === 2 && (
              <NavDropdown.Item href="/home">
                <NavLink to="/home" className="nav-link">
                  ホーム
                </NavLink>
              </NavDropdown.Item>
            )}
            {token && user.role === 2 && (
              <NavDropdown.Item href="/bookmarks">
                <NavLink to="/bookmarks" className="nav-link">
                  ブックマーク一覧
                </NavLink>
              </NavDropdown.Item>
            )}

            {token && (
              <NavDropdown.Item onClick={() => handleLogout()}>
                ログアウト
              </NavDropdown.Item>
            )}
          </NavDropdown>
        </div>
      </div>
    </div>
  );
}
export default Header;
