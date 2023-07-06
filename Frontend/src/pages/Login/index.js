import classNames from "classnames/bind";
import styles from "./login.module.scss";
import { useContext, useEffect, useState } from "react";
import { authApi } from "../../services/auth-api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../contexts/UserContext";
import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const cx = classNames.bind(styles);
function Login() {
  const navigate = useNavigate();
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { loginContext } = useContext(UserContext);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      let response = await authApi.login(user_name, password);
      console.log("res: ", response);
      if (response && response.TokenId) {
        loginContext(
          user_name,
          response.TokenId,
          response.roleId,
          response.user_id
        );
        if (response.roleId === 1) {
          navigate("/admin/manager");
        } else if (response.roleId === 3) {
          navigate("/profile");
        } else {
          navigate("/home");
        }
        toast.success("ログインしました !");
      } else {
        if (response && response.status === 500) {
          toast.error("ユーザー名またはパスワードが正しくありません !");
          console.log("errror2: ", response.status);
        }
      }
    } catch (error) {
      // Xử lý lỗi đăng nhập
      setError(
        "Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập."
      );
      console.error(error);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("form")}>
        <h1 className={cx("header")} style={{ fontWeight: 600, fontSize: 48 }}>
          ログイン
        </h1>
        <form onSubmit={handleLogin}>
          <div className={cx("input-container")}>
            <label style={{ fontSize: 20 }}>ユーザー名 </label>
            <input
              type="text"
              className={cx("input")}
              required
              value={user_name}
              onChange={(e) => setUser_name(e.target.value)}
            />
            <div className={cx("icon")}>
              <PersonIcon />
            </div>
          </div>

          <div className={cx("input-container")}>
            <label style={{ fontSize: 20 }}>パスワード </label>
            <input
              type={!isShowPassword ? "password" : "text"}
              className={cx("input")}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={cx("icon")}>
              <KeyIcon />
            </div>

            <div
              className={cx("iconEye")}
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
            </div>
          </div>

          <div>
            <input
              className={cx("input-form")}
              type="submit"
              value="ログイン"
            />
          </div>
        </form>

        <div style={{ marginTop: 20, fontSize: 20 }}>
          <Link to="/signup">登録</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
