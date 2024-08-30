import FileUpload from "../components/FileUpload";
import MainLayout from "../components/MainLayout";

const UpdateProfilePage = () => {
  return (
    <MainLayout>
      <div className="py-12 h-auto">
        <FileUpload />
      </div>
    </MainLayout>
  );
};

export default UpdateProfilePage;
