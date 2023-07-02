import classNames from "classnames/bind";
import styles from "./Feedback.module.scss";
import { Avatar } from "@mui/material";
const cx = classNames.bind(styles);

function Feedback({ feedback }) {
  console.log("fBB: ", feedback);
  return (
    <>
      {feedback.map((fb, i) => (
        <div className={cx("giaovien")} key={i}>
          <div className={cx("cot1")}>
            <Avatar alt="Remy Sharp" sx={{ width: 112, height: 112 }} />
          </div>

          <div className={cx("cot2")}>
            <h4>Pham Tien Dung</h4>
            <div className={cx("rating")}>
              {[...Array(5)].map((_star, i) => (
                <i
                  key={i}
                  className={cx("fa", {
                    "fa-star": i < parseInt(fb.rating),
                    "fa-star-o": i >= parseInt(fb.rating),
                  })}
                />
              ))}
            </div>
            <p>
              {fb.feedback_content} Lorem ipsum dolor sit amet consectetur
              adipisic elit. Tempora aperiam fuga dolorem consequa, sunt,
              reiciendis quo neque dolores
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
export default Feedback;
