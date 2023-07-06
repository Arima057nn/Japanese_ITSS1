import classNames from "classnames/bind";
import styles from "./ItemStudent.module.scss";
import { Avatar, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";
import { bookmarkApi } from "../../../services/bookmark-api";

const cx = classNames.bind(styles);

function ItemStudent({ student, teacher }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAccepted, setIsAccepted] = useState(student.status);

  const handleDeleteBookmark = async () => {
    try {
      const res = await bookmarkApi.deleteBookmark({
        studentId: student.id,
        teacher_profile_id: teacher.id,
      });

      setIsDeleted(true);
      toast.success("ブックマークを拒絶しました !");
      // Perform any additional actions after successful deletion
    } catch (error) {
      console.log("Error deleting bookmark: ", error);
    }
  };

  const handleAcceptBookmark = async () => {
    try {
      const res = await bookmarkApi.updateBookmark({
        studentId: student.id,
        teacher_profile_id: teacher.id,
        status: 1,
      });
      setIsAccepted(1);
      toast.success("ブックマークを承認しました !");
    } catch (error) {
      console.log("Error deleting bookmark: ", error);
    }
  };
  return (
    !isDeleted && (
      <div className={cx("giaovien")}>
        <div className={cx("cot1")}>
          <Avatar
            alt="Remy Sharp"
            src={student.image}
            sx={{ width: 112, height: 112 }}
          />
        </div>
        <div className={cx("cot2")}>
          <h4>
            {student.last_name} {student.first_name} {student.user_name}
          </h4>
          <div className={cx("rating")}>
            <i className={cx("fa fa-star")}></i>
            <i className={cx("fa fa-star")}></i>
            <i className={cx("fa fa-star")}></i>
            <i className={cx("fa fa-star")}></i>
            <i className={cx("fa fa-star")}></i>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisic elit. Tempora
            aperiam fuga dolorem consequa, sunt, reiciendis quo neque dolores{" "}
            {student.mail}
          </p>
        </div>
        <div className={cx("cot3")}>
          {!isAccepted ? (
            <Button
              color="success"
              onClick={handleAcceptBookmark}
              variant="contained"
              sx={{
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              承認
            </Button>
          ) : (
            <Button
              sx={{
                fontSize: 20,
                fontWeight: 700,
                backgroundColor: "#F24C3D",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#F24C3D",
                  cursor: "text",
                },
              }}
            >
              承認済み
            </Button>
          )}
          {isAccepted === 0 && (
            <Button
              color="error"
              onClick={handleDeleteBookmark}
              variant="contained"
              sx={{
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              拒絶
            </Button>
          )}
        </div>
      </div>
    )
  );
}
export default ItemStudent;
