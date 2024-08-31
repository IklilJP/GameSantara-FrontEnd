import { AnimatePresence, motion } from "framer-motion";
import FileUpload from "../components/Settings/FileUpload";
import MainLayout from "../components/MainLayout";
import { useEffect, useState } from "react";
import UpdateUsername from "../components/Settings/UpdateUsername";

const UpdateProfilePage = () => {
  const [isError, setIsError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(null);
      setIsError(null);
    }, 2000);

    return () => clearTimeout();
  }, [isError, isSuccess]);

  return (
    <MainLayout>
      <div className="py-6 h-auto relative">
        <FileUpload
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          setIsError={setIsError}
          setIsSuccess={setIsSuccess}
        />

        <span className="border-t border-t-colorBorder w-full block"></span>

        <UpdateUsername />

        <AnimatePresence>
          {isSuccess || isError ? (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`absolute flex justify-center top-20 left-[40%] translate-x-[-50%] rounded-lg drop-shadow-xl bg-softBlack border ${isSuccess ? "border-primary" : "border-red-600"}`}>
              <span
                className={`px-5 py-1 font-bold ${isSuccess ? "text-primary" : "text-red-600"}`}>
                {isSuccess || isError}
              </span>
            </motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default UpdateProfilePage;
