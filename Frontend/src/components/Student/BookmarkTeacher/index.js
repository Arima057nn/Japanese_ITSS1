import classNames from "classnames/bind";
import styles from "./BookmarkTeacher.module.scss";
import { FaStar } from "react-icons/fa";
const cx = classNames.bind(styles);

function BookmarkTeacher() {
  return (
    <div className={cx("content0")}>
      <div className={cx("content1")}>
        <h1 className={cx("tittle")}>
          これはあなたの仮申し込みました教師です。
        </h1>
      </div>
    </div>
  );
}
export default BookmarkTeacher;
