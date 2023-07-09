import classNames from "classnames/bind";
import styles from "./signup.module.scss";
import { useState } from "react";
import { userApi } from "../../services/user-api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DefaultLayout from "../../components/Layouts/DefaultLayout";

const cx = classNames.bind(styles);

const TEACHER = 3;
const STUDENT = 2;

function SignUp() {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    user_name: "",
    password: "",
    roleId: 3,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowCfPassword, setIsShowCfPassword] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    if (account.password !== confirmPassword) {
      setErrorMessage("パスワードと同じくない !");
    } else {
      setErrorMessage("");
      try {
        let res = await userApi.register(account);
        console.log(res);
        if (res.status === 500) {
          toast.error(res.data.message);
        } else {
          toast.success("サインアップしました !");
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <DefaultLayout
      content={
        <div className={cx("wrapper")}>
          <div className={cx("form")}>
            <h1
              className={cx("header")}
              style={{ fontWeight: 600, fontSize: 48 }}
            >
              登録
            </h1>
            <form onSubmit={handleRegister}>
              <div className={cx("input-container")}>
                <label style={{ fontSize: 20 }}>ユーザー名</label>
                <input
                  type="text"
                  className={cx("input")}
                  required
                  value={account.user_name}
                  onChange={(e) =>
                    setAccount({ ...account, user_name: e.target.value })
                  }
                ></input>
                <div className={cx("icon")}>
                  <PersonIcon />
                </div>
              </div>

              <div className={cx("input-container")}>
                <label style={{ fontSize: 20 }}>パスワード</label>
                <input
                  type={!isShowPassword ? "password" : "text"}
                  className={cx("input")}
                  required
                  value={account.password}
                  onChange={(e) =>
                    setAccount({ ...account, password: e.target.value })
                  }
                ></input>
                <div className={cx("icon")}>
                  <KeyIcon />
                </div>
                <div
                  className={cx("iconEye")}
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? (
                    <RemoveRedEyeIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </div>
              </div>

              <div className={cx("input-container")}>
                <label style={{ fontSize: 20 }}>パスワードを認証する</label>
                <input
                  type={!isShowCfPassword ? "password" : "text"}
                  className={cx("input")}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
                <div className={cx("icon")}>
                  <KeyIcon />
                </div>
                <div
                  className={cx("iconEye")}
                  onClick={() => setIsShowCfPassword(!isShowCfPassword)}
                >
                  {isShowCfPassword ? (
                    <RemoveRedEyeIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </div>
              </div>
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}
              <div className={cx("input-container")}>
                <label style={{ fontSize: 20 }}>役割 </label>
                <select
                  required
                  className={cx("input")}
                  onChange={(e) => {
                    setAccount({
                      ...account,
                      roleId: parseInt(e.target.value),
                    });
                  }}
                >
                  <option value={TEACHER}> 教師</option>
                  <option value={STUDENT}> 学生</option>
                </select>
              </div>

              <div>
                <input
                  className={cx("input-form")}
                  type="submit"
                  value="登録"
                  style={{
                    fontWeight: 700,
                    fontSize: 20,
                    height: 57,
                  }}
                />
              </div>
            </form>
            <div style={{ fontSize: 16, marginTop: 40 }}>
              アカウントをお持ちですか？
              <Link
                style={{ textDecoration: "none", fontWeight: 600 }}
                to="/login"
              >
                こちら
              </Link>
            </div>
          </div>
        </div>
      }
    ></DefaultLayout>
  );
}

export default SignUp;
