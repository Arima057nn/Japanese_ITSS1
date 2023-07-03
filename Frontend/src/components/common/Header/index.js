import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Avatar } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Dropdown, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
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
        <div className={cx("logo")}>Vlearn</div>
        <div className={cx("option")}>
          <NotificationsNoneIcon sx={{ fontSize: 40 }} />
          {/* {token && user.name && <h4>{user.name}</h4>} */}
          <Avatar
            alt="Remy Sharp"
            src="https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"
            sx={{ width: 48, height: 48, margin: "0 0 0 12px" }}
          />

          <NavDropdown title="">
            {token && user && (
              <Dropdown.ItemText
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  borderBottom: "1px soild red",
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
                  Sign up
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
            {token && user.role === 2 && (
              <NavDropdown.Item href="/home">
                <NavLink to="/home" className="nav-link">
                  ホーム
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
