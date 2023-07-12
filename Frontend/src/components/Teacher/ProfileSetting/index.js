import classNames from "classnames/bind";
import styles from "./ProfileSetting.module.scss";
import { useEffect, useState } from "react";
import { levels, days, times } from "../../../data/target";
import { teacherApi } from "../../../services/teacher-api";
import { FaStar } from "react-icons/fa";
import { Button, Rating } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { userApi } from "../../../services/user-api";
import StarIcon from "@mui/icons-material/Star";

const cx = classNames.bind(styles);

function ProfileSetting() {
  const [teacher, setTeacher] = useState({});
  const [profile, setProfile] = useState({});
  const [resultLevel, setResultLevel] = useState([]);
  const [resultDay, setResultDay] = useState([]);
  const [resultTime, setResultTime] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getTeacher();
  }, []);

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

  const getTeacher = async () => {
    let res = await teacherApi.getTeacher(localStorage.getItem("id"));
    console.log("profile: ", res);
    setTeacher(res);
  };
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    let res = await teacherApi.updateProfile(teacher.id, teacher);
    let res2 = await userApi.updateUser(teacher.teacher_id, profile);
    navigate("/profile");
    toast.success("編集しました !");
  };

  return (
    <>
      <form className={cx("wrapper")} onSubmit={handleSubmitUpdate}>
        <div className={cx("right")}>
          <div className={cx("img")}>
            <img
              className={cx("img-profile")}
              src="data:image/jpeg;base64,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"
            ></img>
          </div>
          <div className={cx("rating")}>
            <Rating
              name="text-feedback"
              value={5}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
          </div>
          <div className={cx("item")}>
            <div className={cx("item-name")}>名前</div>
            <div style={{ width: 20 }}>:</div>
            <div style={{ width: 220 }}>
              <>
                <input
                  value={teacher.last_name}
                  onChange={(e) => {
                    setTeacher({ ...teacher, last_name: e.target.value });
                    setProfile({ ...profile, last_name: e.target.value });
                  }}
                  style={{ width: 107, padding: "3px 4px", fontSize: 20 }}
                />{" "}
                <input
                  value={teacher.first_name}
                  onChange={(e) => {
                    setTeacher({ ...teacher, first_name: e.target.value });
                    setProfile({ ...profile, first_name: e.target.value });
                  }}
                  style={{ width: 107, padding: "3px 4px", fontSize: 20 }}
                />
              </>
            </div>
          </div>
          <div className={cx("item")}>
            <div className={cx("item-name")}>歳</div>
            <div style={{ width: 20 }}>:</div>
            <div>
              <input
                value={teacher.age}
                required
                onChange={(e) => {
                  setTeacher({ ...teacher, age: e.target.value });
                  setProfile({ ...profile, age: e.target.value });
                }}
                style={{ width: 220, padding: "0 4px" }}
              />
            </div>
          </div>
          <div className={cx("item")}>
            <div className={cx("item-name")}>性別</div>
            <div style={{ width: 20 }}>:</div>
            <select
              required
              style={{ width: 220, padding: "4px 4px" }}
              onChange={(e) => {
                setTeacher({ ...teacher, sex: e.target.value });
                setProfile({ ...profile, sex: e.target.value });
              }}
            >
              <option className={cx("option-header")}>
                {teacher.sex === "Male" ? "男の人" : "女の人"}
              </option>
              <option value="Male">男の人</option>
              <option value="Famale">女の人</option>
            </select>
          </div>
          <div></div>
          <div className={cx("item")}>
            <div className={cx("item-name")}>メール</div>
            <div style={{ width: 20 }}>:</div>
            <input
              value={teacher.mail ?? ""}
              required
              type="email"
              style={{ width: 220, padding: "0 4px" }}
              onChange={(e) => setTeacher({ ...teacher, mail: e.target.value })}
            />
          </div>
          <div className={cx("item")}>
            <div className={cx("item-name")}>電話番号</div>
            <div style={{ width: 20 }}>:</div>
            <input
              value={teacher.phone_number}
              required
              type="text"
              onChange={(e) =>
                setTeacher({ ...teacher, phone_number: e.target.value })
              }
              style={{ width: 220, padding: "0 4px" }}
            />
          </div>
        </div>
        <div className={cx("left")}>
          <div className={cx("header-profile")}>
            <p
              style={{ marginBottom: 0, fontWeight: 600 }}
              className={cx("profile-info")}
            >
              個人情報
            </p>
            <div>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  fontSize: 18,
                  fontWeight: 600,
                  width: 90,
                  borderRadius: 2,
                }}
              >
                保存
              </Button>
            </div>
          </div>

          <textarea
            required
            rows={4}
            cols={50}
            value={teacher.bio}
            style={{ padding: 8 }}
            onChange={(e) => {
              setTeacher({
                ...teacher,
                bio: e.target.value,
              });
            }}
          ></textarea>

          <div className={cx("profile-info")}>
            <h4 className={cx("item-name")}>レベル</h4>
            <select
              style={{ padding: "4px", width: 200 }}
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
          <div className={cx("profile-info")}>
            <h4 className={cx("item-name")}>曜日</h4>
            <select
              style={{ padding: "4px", width: 200 }}
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
          <div className={cx("profile-info")}>
            <h4 className={cx("item-name")}>時間</h4>
            <select
              style={{ padding: "4px", width: 200 }}
              onChange={(e) => {
                setTeacher({
                  ...teacher,
                  available_time: e.target.value,
                });
              }}
            >
              <option className={cx("option-header")}>
                {resultTime[0] && <> {resultTime[0].time_name}</>}
              </option>
              <option value="Morning">朝</option>
              <option value="Noon">昼</option>
              <option value="Evening">夕方</option>
              <option value="Night">夜</option>
            </select>
          </div>
          <div className={cx("profile-info")}>
            <h4 className={cx("item-name")}>場所</h4>
            <select
              style={{ padding: "4px", width: 200 }}
              onChange={(e) => {
                setTeacher({
                  ...teacher,
                  address: e.target.value,
                });
              }}
            >
              <option className={cx("option-header")}>{teacher.address}</option>
              <option value="Ha Noi">Ha Noi</option>
              <option value="Ho Chi Minh">Ho Chi Minh</option>
            </select>
          </div>
          <div className={cx("profile-info")}>
            <h4 className={cx("item-name")}>料金</h4>
            <select
              style={{ padding: "4px", width: 200 }}
              required
              onChange={(e) => {
                setTeacher({
                  ...teacher,
                  tution: e.target.value,
                });
              }}
            >
              <option className={cx("option-header")}>{teacher.tution} </option>
              <option value="500">500</option>
              <option value="1000">1000</option>
              <option value="1500">1500</option>
              <option value="2000">2000</option>
              <option value="2500">2500</option>
            </select>
          </div>
        </div>
      </form>
    </>
  );
}
export default ProfileSetting;
