import classNames from "classnames/bind";
import styles from "./BookmarkStudentList.module.scss";
import { useEffect, useState } from "react";
import { userApi } from "../../../services/user-api";
import ItemStudent from "../ItemStudent";
import { teacherApi } from "../../../services/teacher-api";
const cx = classNames.bind(styles);

function BookmarkStudentList() {
  const [studentList, setStudentList] = useState([]);
  const [teacher, setTeacher] = useState({});
  useEffect(() => {
    if (teacher.id) {
      getStudentList();
    }
  }, [teacher.id]);

  useEffect(() => {
    getTeacher();
  }, []);

  const getTeacher = async () => {
    let res = await teacherApi.getTeacher(localStorage.getItem("id"));
    // console.log("profile: ", res);
    setTeacher(res);
  };

  const getStudentList = async () => {
    let res = await userApi.getStudents({
      teacher_profile_id: teacher.id,
      status: 0,
    });
    setStudentList(res);
  };
  return (
    <div className={cx("content0")}>
      <div className={cx("content1")}>
        <h1 className={cx("tittle")}>BookmarkStudentList</h1>
      </div>

      <div className={cx("content2")}>
        {studentList.map((student, i) => (
          <ItemStudent key={i} student={student} teacher={teacher} />
        ))}
      </div>
    </div>
  );
}
export default BookmarkStudentList;
