import classNames from "classnames/bind";
import styles from "./BookmarkStudentList.module.scss";
import { useEffect, useState } from "react";
import { userApi } from "../../../services/user-api";
import ItemStudent from "../ItemStudent";
import { teacherApi } from "../../../services/teacher-api";
const cx = classNames.bind(styles);

function BookmarkStudentList() {
  const [studentList, setStudentList] = useState([]);
  const [studentList1, setStudentList1] = useState([]);
  const [teacher, setTeacher] = useState({});
  useEffect(() => {
    if (teacher.id) {
      getStudentList(0);
      getStudentList(1);
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

  const getStudentList = async (status) => {
    let res = await userApi.getStudents({
      teacher_profile_id: teacher.id,
      status: status,
    });
    if (status === 0) {
      setStudentList(res);
    }
    if (status === 1) {
      setStudentList1(res);
    }
  };

  return (
    <div className={cx("content0")}>
      <div className={cx("content1")}>
        <h1 className={cx("tittle")}>これはあなたを申し込みました学生です。</h1>
      </div>

      <div className={cx("content2")}>
        {studentList1.map((student, i) => (
          <ItemStudent key={i} student={student} teacher={teacher} />
        ))}
        {studentList.map((student, i) => (
          <ItemStudent key={i} student={student} teacher={teacher} />
        ))}
      </div>
    </div>
  );
}
export default BookmarkStudentList;
