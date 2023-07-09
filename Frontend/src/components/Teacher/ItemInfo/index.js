import classNames from "classnames/bind";
import styles from "./ItemInfo.module.scss";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function ItemInfo({ teacher }) {
  const navigate = useNavigate();
  const handleDetailInfo = (event) => {
    event.preventDefault();
    if (localStorage.getItem("role") !== "2") {
      console.log("kkkk: ", localStorage.getItem("id"));
      toast.error("先にログインしてください！");
      navigate("/login");
    } else {
      navigate(`/info/${teacher.teacher_id}`);
    }
  };
  return (
    <div className={cx("giaovien")}>
      <div className={cx("cot1")}>
        <Avatar
          alt="Remy Sharp"
          src={teacher.image}
          sx={{ width: 112, height: 112 }}
        />
      </div>
      <div className={cx("cot2")}>
        <h4 style={{ marginBottom: 0 }}>
          {teacher.last_name} {teacher.first_name}
        </h4>
        <div className={cx("rating")}>
          {[...Array(5)].map((_star, i) => (
            <i
              key={i}
              className={cx("fa", {
                "fa-star":
                  i <
                  parseInt(teacher.average_rating ? teacher.average_rating : 0),
                "fa-star-o":
                  i >=
                  parseInt(teacher.average_rating ? teacher.average_rating : 0),
              })}
            />
          ))}
        </div>
        <p style={{ marginBottom: 0 }}>{teacher.bio}</p>
      </div>
      <div className={cx("cot3")}>
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
      </div>
    </div>
  );
}
export default ItemInfo;
