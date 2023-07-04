import classNames from "classnames/bind";
import styles from "./ItemStudent.module.scss";
import { Avatar, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";
import { bookmarkApi } from "../../../services/bookmark-api";

const cx = classNames.bind(styles);

function ItemStudent({ student, teacher }) {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteBookmark = async () => {
    console.log("studentt : ", student);
    console.log("teacherr : ", teacher);
    try {
      const res = await bookmarkApi.deleteBookmark({
        studentId: student.id,
        teacher_profile_id: teacher.id,
      });
      console.log("Success: ", res);
      setIsDeleted(true);
      toast.success("Delete Success !");
      // Perform any additional actions after successful deletion
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
            {student.last_name} {student.first_name}
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
          <Button
            color="success"
            variant="contained"
            sx={{
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            承認
          </Button>

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
        </div>
      </div>
    )
  );
}
export default ItemStudent;
