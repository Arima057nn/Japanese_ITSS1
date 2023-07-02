import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import BookmarkTeacher from "../../../components/Student/BookmarkTeacher";

function BookmarkList() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <DefaultLayout content={<BookmarkTeacher />}></DefaultLayout>;
    </div>
  );
}

export default BookmarkList;
