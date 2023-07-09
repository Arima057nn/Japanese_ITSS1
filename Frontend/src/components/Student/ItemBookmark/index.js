import classNames from "classnames/bind";
import styles from "./ItemBookmark.module.scss";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { bookmarkApi } from "../../../services/bookmark-api";
import { useState } from "react";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function ItemBookmark({ user, teacher }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();
  const handleDetailInfo = (event) => {
    event.preventDefault();
    navigate(`/info/${teacher.teacher_id}`);
  };

  const handleDeleteBookmark = async () => {
    try {
      const res = await bookmarkApi.deleteBookmark({
        studentId: user.userId,
        teacher_profile_id: teacher.id,
      });
      setIsDeleted(true);
      toast.success("ブックマークをキャンセルしました !");
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
            src={teacher.image}
            sx={{ width: 112, height: 112 }}
          />
        </div>
        <div className={cx("cot2")}>
          <h4>
            {teacher.last_name} {teacher.first_name}
          </h4>
          <div className={cx("rating")}>
            {[...Array(5)].map((_star, i) => (
              <i
                key={i}
                className={cx("fa", {
                  "fa-star":
                    i <
                    parseInt(
                      teacher.average_rating ? teacher.average_rating : 0
                    ),
                  "fa-star-o":
                    i >=
                    parseInt(
                      teacher.average_rating ? teacher.average_rating : 0
                    ),
                })}
              />
            ))}
          </div>
          <p>{teacher.bio}</p>
        </div>
        <div className={cx("cot3")}>
          {teacher.status === 0 && (
            <>
              <Button
                onClick={handleDetailInfo}
                variant="contained"
                sx={{
                  backgroundColor: "var(--primary)",
                  color: "black",
                  fontSize: 16,
                  fontWeight: 700,
                  width: 134,
                  height: 44,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "var(--primary-hover)",
                  },
                }}
              >
                もっと詳しく
              </Button>

              <Button
                onClick={handleDeleteBookmark}
                variant="contained"
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  width: 134,
                  height: 44,
                  borderRadius: 2,
                }}
              >
                削除
              </Button>
            </>
          )}

          {teacher.status === 1 && (
            <>
              <Button
                sx={{
                  fontSize: 20,
                  fontWeight: 700,
                  backgroundColor: "#F24C3D",
                  color: "#fff",
                  width: 134,
                  height: 44,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#F24C3D",
                    cursor: "text",
                  },
                }}
              >
                受け入れた
              </Button>
              <Button
                onClick={handleDetailInfo}
                variant="contained"
                sx={{
                  backgroundColor: "var(--primary)",
                  color: "black",
                  fontSize: 16,
                  fontWeight: 700,
                  width: 134,
                  height: 44,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "var(--primary-hover)",
                  },
                }}
              >
                もっと詳しく
              </Button>
            </>
          )}

          {teacher.status === 2 && (
            <>
              <Button
                sx={{
                  fontSize: 20,
                  fontWeight: 700,
                  backgroundColor: "#468B97",
                  color: "#fff",
                  width: 134,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#468B97",
                    cursor: "text",
                  },
                }}
              >
                拒否された
              </Button>
              <Button
                onClick={handleDeleteBookmark}
                variant="contained"
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  width: 134,
                  height: 44,
                  borderRadius: 2,
                }}
              >
                削除
              </Button>
            </>
          )}
        </div>
      </div>
    )
  );
}
export default ItemBookmark;
