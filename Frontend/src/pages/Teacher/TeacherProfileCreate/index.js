import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import ProfileCreate from "../../../components/Teacher/ProfileCreate";

function TeacherProfileCreate() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <DefaultLayout content={<ProfileCreate />}></DefaultLayout>
    </div>
  );
}

export default TeacherProfileCreate;
