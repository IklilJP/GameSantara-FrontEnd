import { AnimatePresence, motion } from "framer-motion";
import FileUpload from "../components/Settings/FileUpload";
import MainLayout from "../components/MainLayout";
import { useState } from "react";
import UpdateUsername from "../components/Settings/UpdateUsername";

const UpdateProfilePage = () => {
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MainLayout>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="py-12 h-auto">
          <FileUpload setIsLoading={setIsLoading} setIsError={setIsError} />

          <span className="border border-colorBorder w-full block"></span>

          <UpdateUsername />

          {/* {isLoading && ( */}
          {/**/}
          {/* )} */}
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
};

export default UpdateProfilePage;
