import classNames from "classnames/bind";
import styles from "./BookmarkTeacher.module.scss";
import { useContext, useEffect, useState } from "react";
import { teacherApi } from "../../../services/teacher-api";
import { UserContext } from "../../../contexts/UserContext";
import ItemBookmark from "../ItemBookmark";

const cx = classNames.bind(styles);

function BookmarkTeacher() {
  const [bookmarkList, setBookmarkList] = useState([]);
  const [bookmarkedList, setBookmarkedList] = useState([]);
  const [deniedList, setDeniedList] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.userId !== 0) {
      getBookmarkList();
    }
  }, [user.userId]);

  const getBookmarkList = async () => {
    console.log("hahahah: ", user);
    let res = await teacherApi.getBookmarkTeachers({
      studentId: user.userId,
      status: 0,
    });
    let res1 = await teacherApi.getBookmarkTeachers({
      studentId: user.userId,
      status: 1,
    });
    let res2 = await teacherApi.getBookmarkTeachers({
      studentId: user.userId,
      status: 2,
    });
    setBookmarkList(res);
    setBookmarkedList(res1);
    setDeniedList(res2);
  };

  return (
    <div className={cx("content0")}>
      <div className={cx("content1")}>
        <h1 className={cx("tittle")}>
          これはあなたの仮申し込みました教師です。
        </h1>
      </div>

      <div className={cx("content2")}>
        {bookmarkList.length === 0 &&
        bookmarkedList.length === 0 &&
        deniedList.length === 0 ? (
          <h1>仮申し込みました教師はありません !</h1>
        ) : (
          <>
            {bookmarkedList.map((teacher, i) => (
              <ItemBookmark key={i} user={user} teacher={teacher} />
            ))}

            {deniedList.map((teacher, i) => (
              <ItemBookmark key={i} user={user} teacher={teacher} />
            ))}
            {bookmarkList.map((teacher, i) => (
              <ItemBookmark key={i} user={user} teacher={teacher} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
export default BookmarkTeacher;
