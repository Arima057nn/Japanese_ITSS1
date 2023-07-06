import classNames from "classnames/bind";
import styles from "./ProfileCreate.module.scss";
import { useEffect, useState } from "react";
import { levels, days, times } from "../../../data/target";
import { teacherApi } from "../../../services/teacher-api";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { userApi } from "../../../services/user-api";

const cx = classNames.bind(styles);

function ProfileCreate() {
  const [teacher, setTeacher] = useState({
    teacher_id: parseInt(localStorage.getItem("id")),
    bio: "Bio12",
    experience: "haha",
  });
  const [profile, setProfile] = useState({});
  const [resultLevel, setResultLevel] = useState([]);
  const [resultDay, setResultDay] = useState([]);
  const [resultTime, setResultTime] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const level = levels.find((item) => item.id === teacher.level);
    setResultLevel(level ? [level] : []);
  }, [teacher.level]);

  useEffect(() => {
    const day = days.find((item) => item.id === teacher.available_day);
    setResultDay(day ? [day] : []);
  }, [teacher.available_day]);

  useEffect(() => {
    const time = times.find((item) => item.id === teacher.available_time);
    setResultTime(time ? [time] : []);
  }, [teacher.available_time]);

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    let res = await teacherApi.createTeacher(teacher);
    let res2 = await userApi.updateUser(localStorage.getItem("id"), profile);
    if (res.status === 500) {
      toast.error("Vui long nhap day du thong tin");
    } else {
      navigate("/profile");
      toast.success("プロフィールを作成しました !");
    }
  };

  return (
    <>
      <form className={cx("wrapper")} onSubmit={handleSubmitUpdate}>
        <div className={cx("right")}>
          <img
            className={cx("img-profile")}
            src="data:image/jpeg;base64,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"
          ></img>

          <div className={cx("profile-title")}>
            <h4 style={{ paddingRight: 70, marginBottom: -4 }}>名前</h4>
            <div style={{ fontSize: 18, fontWeight: 700 }}>
              :{" "}
              <input
                value={teacher.last_name}
                onChange={(e) => {
                  setProfile({ ...profile, last_name: e.target.value });
                }}
                style={{ width: 100, padding: "1px 4px", fontSize: 20 }}
              />{" "}
              <input
                value={teacher.first_name}
                onChange={(e) => {
                  setProfile({ ...profile, first_name: e.target.value });
                }}
                style={{ width: 100, padding: "1px 4px", fontSize: 20 }}
              />
            </div>
          </div>
          <div className={cx("profile-title")}>
            <h4 style={{ paddingRight: 58 }}>
              歳 :{" "}
              <input
                type="number"
                required
                value={teacher.age}
                onChange={(e) => {
                  setProfile({ ...profile, age: e.target.value });
                }}
                style={{ width: 80, padding: 4, fontSize: 20 }}
              />
            </h4>
            <h4>
              性別 :{" "}
              <select
                required
                onChange={(e) => {
                  setProfile({ ...profile, sex: e.target.value });
                }}
              >
                <option className={cx("option-header")}></option>
                <option value="Male">男の人</option>
                <option value="Famale">女の人</option>
              </select>
            </h4>
          </div>
          <div className={cx("profile-title")}>
            <h4 style={{ paddingRight: 40 }}>メール</h4>
            <h4>
              :{" "}
              <input
                value={teacher.mail ?? ""}
                required
                type="email"
                style={{ width: 220, padding: 4, fontSize: 20 }}
                onChange={(e) =>
                  setTeacher({ ...teacher, mail: e.target.value })
                }
              />
            </h4>
          </div>
          <div className={cx("profile-title-phone")}>
            <h4 style={{ paddingRight: 40 }}>電話番号</h4>
            <h4>
              :{" "}
              <input
                required
                value={teacher.phone_number}
                type="tel"
                onChange={(e) =>
                  setTeacher({ ...teacher, phone_number: e.target.value })
                }
                style={{ width: 160, padding: 4, fontSize: 20 }}
              />
            </h4>
          </div>
        </div>
        <div className={cx("left")}>
          <div className={cx("header-profile")}>
            <h4 className={cx("profile-info")}>個人情報</h4>
            <div>
              <Button
                variant="contained"
                type="submit"
                sx={{ fontSize: 18, fontWeight: 600 }}
              >
                保存
              </Button>
            </div>
          </div>
          <p className={cx("p-profile")}>{teacher.bio}</p>
          <div className={cx("profile-info")}>
            <h4 className={cx("pd-r15")}>レベル</h4>
            <select
              required
              onChange={(e) => {
                setTeacher({
                  ...teacher,
                  level: e.target.value,
                });
              }}
            >
              <option className={cx("option-header")}>
                {resultLevel[0] && <> {resultLevel[0].level_name}</>}
              </option>
              <option value="1">ビギナー</option>
              <option value="2">初級</option>
              <option value="3">中級</option>
              <option value="4">上級</option>
            </select>
          </div>
          <div className={cx("profile-info-mt10")}>
            <h4 className={cx("pd-r35")}>曜日</h4>
            <select
              required
              onChange={(e) => {
                setTeacher({
                  ...teacher,
                  available_day: e.target.value,
                });
              }}
            >
              <option className={cx("option-header")}>
                {resultDay[0] && <> {resultDay[0].day_name}</>}
              </option>
              <option value="2">月曜日</option>
              <option value="3">火曜日</option>
              <option value="4">水曜日</option>
              <option value="5">木曜日</option>
              <option value="6">金曜日</option>
              <option value="7">土曜日</option>
              <option value="8">日曜日</option>
            </select>
          </div>
          <div className={cx("profile-info-mt10")}>
            <h4 className={cx("pd-r35")}>時間</h4>
            <select
              required
              className={cx("chung")}
              onChange={(e) => {
                setTeacher({
                  ...teacher,
                  available_time: e.target.value,
                });
              }}
            >
              <option className={cx("option-header")}></option>
              <option value="Morning">朝</option>
              <option value="Noon">昼</option>
              <option value="Evening">夕方</option>
              <option value="Night">夜</option>
            </select>
          </div>
          <div className={cx("profile-info-mt10")}>
            <h4 className={cx("pd-r35")}>場所</h4>
            <select
              required
              onChange={(e) => {
                setTeacher({
                  ...teacher,
                  address: e.target.value,
                });
              }}
            >
              <option className={cx("option-header")}></option>
              <option value="Ha Noi">Ha Noi</option>
              <option value="Ho Chi Minh">Ho Chi Minh</option>
            </select>
          </div>
          <div className={cx("profile-info-mt10")}>
            <h4 className={cx("pd-r35")}>料金</h4>
            <select
              required
              onChange={(e) => {
                setTeacher({
                  ...teacher,
                  tution: e.target.value,
                });
              }}
            >
              <option className={cx("option-header")}> </option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
            </select>
          </div>

          <div className={cx("profile-info-mt10")}>
            <h4 className={cx("pd-r35")}>目的</h4>
            <select
              required
              onChange={(e) => {
                setTeacher({
                  ...teacher,
                  target_id: e.target.value,
                });
              }}
            >
              <option className={cx("option-header")}></option>
              <option value="1">日常会話</option>
              <option value="2">ビジネス</option>
              <option value="3">ベトナム語能力の試験</option>
            </select>
          </div>
        </div>
      </form>
    </>
  );
}
export default ProfileCreate;
