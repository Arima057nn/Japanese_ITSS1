import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { useEffect, useState } from "react";
import { levels, days, times } from "../../../data/target";
import { teacherApi } from "../../../services/teacher-api";
import { FaStar } from "react-icons/fa";
import { feedbackApi } from "../../../services/feedback-api";
import { Backdrop, Box, Button, Fade, Modal, Rating } from "@mui/material";
import Feedback from "../../Feedback";
import StarIcon from "@mui/icons-material/Star";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  height: 600,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const styleDelete = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 440,
  height: 200,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

function Profile() {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const [resultLevel, setResultLevel] = useState([]);
  const [resultDay, setResultDay] = useState([]);
  const [resultTime, setResultTime] = useState([]);
  const [start, setStart] = useState(false);

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

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
    if (res.status === 500) setStart(true);
    setTeacher(res);
  };

  const handleOpen = () => {
    setOpen(true);
    getFeedbacks();
  };

  const handleClose = () => setOpen(false);
  const handleCloseDelete = () => setOpenDelete(false);

  const getFeedbacks = async () => {
    let res = await feedbackApi.getFeedback(teacher.id);
    setFeedbacks(res);
    console.log("fb: ", res);
  };

  const handleDelete = async () => {
    let res = await teacherApi.deleteTeacher(teacher.id);
    toast.success("プロフィールを削除しました !");
    navigate("/profile/create");
    // navigate("/home");

    console.log("fb: ", res);
  };

  return (
    <>
      <div className={cx("wrapper")}>
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
              value={!start ? 5 : 0}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
          </div>
          <div className={cx("item")}>
            <p className={cx("item-name")}>名前</p>
            <p style={{ width: 20 }}>:</p>
            <p style={{ width: 200 }}>
              {teacher.last_name} {teacher.first_name}
            </p>
          </div>
          <div className={cx("item")}>
            <p className={cx("item-name")}>歳</p>
            <p style={{ width: 20 }}>:</p>
            <p style={{ width: 200 }}>{teacher.age}</p>
          </div>
          <div className={cx("item")}>
            <p className={cx("item-name")}>性別</p>
            <p style={{ width: 20 }}>:</p>
            <p style={{ width: 200 }}>
              {teacher.sex === "Male" ? "男の人" : "女の人"}
            </p>
          </div>
          <div className={cx("item")}>
            <p className={cx("item-name")}>メール</p>
            <p style={{ width: 20 }}>:</p>
            <p style={{ width: 200 }}>{teacher.mail}</p>
          </div>
          <div className={cx("item")}>
            <p className={cx("item-name")}>電話番号</p>
            <p style={{ width: 20 }}>:</p>
            <p style={{ width: 200 }}>{teacher.phone_number}</p>
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

            {start ? (
              <Link to="/profile/create">
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    width: 130,
                    borderRadius: 2,
                  }}
                >
                  作成
                </Button>
              </Link>
            ) : (
              <Link to="/profile/setting">
                <Button
                  variant="contained"
                  sx={{
                    fontSize: 18,
                    backgroundColor: "#9DB2BF",
                    color: "#333",
                    fontWeight: 600,
                    width: 94,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#73A9AD",
                    },
                  }}
                >
                  編集
                </Button>
              </Link>
            )}
          </div>
          <p style={{ fontSize: 20, minHeight: 30 }}>{teacher.bio}</p>
          <div className={cx("profile-info")}>
            <p className={cx("item-name")}>レベル</p>
            <p>{resultLevel[0] && <> {resultLevel[0].level_name}</>}</p>
          </div>
          <div className={cx("profile-info")}>
            <p className={cx("item-name")}>曜日</p>
            <p>{resultDay[0] && <> {resultDay[0].day_name}</>}</p>
          </div>
          <div className={cx("profile-info")}>
            <p className={cx("item-name")}>時間</p>
            <p>{resultTime[0] && <> {resultTime[0].time_name}</>}</p>
          </div>
          <div className={cx("profile-info")}>
            <p className={cx("item-name")}>場所</p>
            <p>{teacher.address}</p>
          </div>
          <div className={cx("profile-info")}>
            <p className={cx("item-name")}>料金</p>
            <p>{teacher.tution} 円</p>
          </div>
          <div className={cx("bottom-btn")}>
            {!start && (
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                  fontSize: 18,
                  backgroundColor: "#9DB2BF",
                  color: "#333",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#73A9AD",
                  },
                }}
              >
                評価を見る
              </Button>
            )}
            {!start && (
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setOpenDelete(true);
                }}
                sx={{
                  fontSize: 18,
                  fontWeight: 600,
                  width: 90,
                  borderRadius: 2,
                }}
              >
                削除
              </Button>
            )}
          </div>
        </div>
      </div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <p className={cx("tittle")}>フィードバック ~</p>
            {feedbacks.length === 0 ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <h1>フィードバックはありません !</h1>
              </div>
            ) : (
              <Feedback feedback={feedbacks} />
            )}
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openDelete}
        onClose={handleCloseDelete}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={openDelete}>
          <Box sx={styleDelete}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: " space-around",
                width: "100%",
                height: "100%",
                alignItems: "center",
              }}
            >
              <h2>プロフィールを削除する ?</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    width: 130,
                    borderRadius: 2,
                  }}
                >
                  削除
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleCloseDelete}
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    width: 130,
                    borderRadius: 2,
                  }}
                >
                  キャンセル
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
export default Profile;
