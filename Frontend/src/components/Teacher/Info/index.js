import classNames from "classnames/bind";
import styles from "./Info.module.scss";
import { teacherApi } from "../../../services/teacher-api";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { levels, days, times } from "../../../data/target";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Rating,
  Typography,
} from "@mui/material";
import Feedback from "../../Feedback";
import { feedbackApi } from "../../../services/feedback-api";
import { bookmarkApi } from "../../../services/bookmark-api";
import { UserContext } from "../../../contexts/UserContext";
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

function Info() {
  const { user } = useContext(UserContext);
  const params = useParams();
  const [teacher, setTeacher] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const [resultLevel, setResultLevel] = useState([]);
  const [resultDay, setResultDay] = useState([]);
  const [resultTime, setResultTime] = useState([]);
  const [status, setStatus] = useState(0);
  const [star, setStar] = useState(0);
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [openFb, setOpenFb] = useState(false);
  const [bookmark, setBookmark] = useState({});
  const [bookmarked, setBookmarked] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    getFeedbacks();
  };
  const handleOpenFb = () => {
    if (status === 1) setOpenFb(true);
  };
  const handleClose = () => setOpen(false);
  const handleCloseFb = () => setOpenFb(false);

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
    let res = await teacherApi.getTeacher(params.id);
    setTeacher(res);

    setBookmark({
      ...bookmark,
      teacher_profile_id: res.id,
      target_id: res.target_id,
      status: 0,
    });
  };

  const getFeedbacks = async () => {
    let res = await feedbackApi.getFeedback(teacher.id);
    setFeedbacks(res);
  };

  const handleBookmark = () => {
    console.log("bookmark: ", bookmark);
    setBookmark((prevBookmark) => ({
      ...prevBookmark,
      studentId: user.userId,
    }));
    setBookmarked(true);
    toast.success("ブックマークしました !");
  };

  useEffect(() => {
    const createBookmark = async () => {
      console.log("bookmark2: ", bookmark);
      let res = await bookmarkApi.createBookmark(bookmark);
    };
    if (bookmark.studentId) {
      createBookmark();
    }
  }, [bookmark.studentId]);

  useEffect(() => {
    const searchBookmark = async () => {
      let res = await bookmarkApi.searchBookmark({
        studentId: user.userId,
        teacher_profile_id: teacher.id,
      });
      if (res.length === 0) {
        setBookmarked(false);

        console.log("search: null");
      } else {
        setBookmarked(true);
        setStatus(res[0].status);
        console.log("search: ", res);
      }
    };
    if (user.userId !== 0 && teacher.id) {
      searchBookmark();
    }
  }, [user.userId, teacher.id]);

  const handleCreateFeedback = async () => {
    let res = await feedbackApi.createFeedback({
      teacher_profile_id: teacher.id,
      studentId: user.userId,
      feedback_content: content,
      rating: star,
    });
    toast.success("フィードバックしました !");
    setStar(0);
    handleCloseFb();
    handleOpen();
    console.log("feedback: ", res);
  };
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("right")}>
          <img
            className={cx("img-profile")}
            src="data:image/jpeg;base64,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"
          ></img>

          <div className={cx("profile-title")}>
            <h4 style={{ paddingRight: 70 }}>名前</h4>
            <h4>
              : {teacher.last_name} {teacher.first_name}
            </h4>
          </div>
          <div className={cx("profile-title")}>
            <h4 style={{ paddingRight: 58 }}>歳 :{teacher.age}</h4>
            <h4>性別 : {teacher.sex === "Male" ? "男の人" : "女の人"}</h4>
          </div>
          <div className={cx("profile-title")}>
            <h4 style={{ paddingRight: 40 }}>メール</h4>
            <h4>: {teacher.mail}</h4>
          </div>
          <div className={cx("profile-title-phone")}>
            <h4 style={{ paddingRight: 40 }}>電話番号</h4>
            <h4>: {teacher.phone_number}</h4>
          </div>
          {!bookmarked ? (
            <button className={cx("left-btn")} onClick={handleBookmark}>
              仮申し込み
            </button>
          ) : (
            <button disabled className={cx("left-btn-bookmark")}>
              仮申し込みをした
            </button>
          )}
        </div>
        <div className={cx("left")}>
          <div className={cx("header-profile")}>
            <h4 className={cx("profile-info")}>個人情報</h4>
            {/* <button className={cx("btn")}>編集</button> */}
          </div>
          <p className={cx("p-profile")}>{teacher.bio}</p>
          <div className={cx("profile-info")}>
            <h4 className={cx("pd-r15")}>レベル</h4>
            <p>{resultLevel[0] && <> {resultLevel[0].level_name}</>}</p>
          </div>
          <div className={cx("profile-info-mt10")}>
            <h4 className={cx("pd-r35")}>曜日</h4>
            <p>{resultDay[0] && <> {resultDay[0].day_name}</>}</p>
          </div>
          <div className={cx("profile-info-mt10")}>
            <h4 className={cx("pd-r35")}>時間</h4>
            {/* <p>{teacher.time}</p> */}
            <p>{resultTime[0] && <> {resultTime[0].time_name}</>}</p>
          </div>
          <div className={cx("profile-info-mt10")}>
            <h4 className={cx("pd-r35")}>場所</h4>
            <p>{teacher.address}</p>
          </div>
          <div className={cx("profile-info-mt10")}>
            <h4 className={cx("pd-r35")}>料金</h4>
            <p>{teacher.tution} 円</p>
          </div>
          <div className={cx("bottom-btn")}>
            <Button variant="contained" onClick={handleOpen}>
            評価を見る
              </Button>
            {status === 1 && (
              <Button variant="contained" onClick={handleOpenFb}>
                評価する
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
            <Feedback feedback={feedbacks} />
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openFb}
        onClose={handleCloseFb}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={openFb}>
          <Box sx={style}>
            <div className={cx("feedback")}>
              <div className={cx("avatar")}>
                <img
                  className={cx("img-profile1")}
                  src="data:image/jpeg;base64,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"
                ></img>
              </div>
              <div className={cx("content")}>
                <h2>{localStorage.getItem("username")}</h2>
                <Box
                  sx={{
                    "& > legend": { mt: 0 },
                    marginBottom: 2,
                  }}
                >
                  <Typography component="legend"></Typography>
                  <Rating
                    name="simple-controlled"
                    value={star}
                    onChange={(event, newValue) => {
                      setStar(newValue);
                    }}
                  />
                </Box>

                <textarea
                  id="w3review"
                  name="w3review"
                  rows="10"
                  cols="50"
                  style={{
                    padding: 12,
                  }}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>

                <div className={cx("button")}>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ marginLeft: 4, fontSize: 20 }}
                    onClick={handleCloseFb}
                  >
                    キャンセル
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ marginLeft: 4, fontSize: 20 }}
                    onClick={handleCreateFeedback}
                  >
                    評価する
                  </Button>
                </div>
              </div>
              <div className={cx("empty")}></div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
export default Info;
