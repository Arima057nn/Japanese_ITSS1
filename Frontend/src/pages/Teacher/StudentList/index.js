import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import BookmarkStudentList from "../../../components/Teacher/BookmarkStudentList";

function StudentList() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <DefaultLayout content={<BookmarkStudentList />}></DefaultLayout>;
    </div>
  );
}

export default StudentList;
