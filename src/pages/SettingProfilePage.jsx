import { AnimatePresence, motion } from "framer-motion";
import MainLayout from "../components/MainLayout";
import { useEffect, useState } from "react";
import UpdateUsername from "../components/Settings/UpdateUsername";
import UpdateProfilePicture from "../components/Settings/UpdateProfilePicture";
import UpdateFullName from "../components/Settings/UpdateFullName";
import UpdateBio from "../components/Settings/UpdateBio";

const SettingProfilePage = () => {
  const [isError, setIsError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

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
        <UpdateProfilePicture
          setIsError={setIsError}
          setIsSuccess={setIsSuccess}
        />

        <span className="border-t border-t-colorBorder w-full block"></span>

        <UpdateUsername setIsSuccess={setIsSuccess} setIsError={setIsError} />

        <span className="border-t border-t-colorBorder w-full block"></span>

        <UpdateFullName setIsSuccess={setIsSuccess} setIsError={setIsError} />

        <span className="border-t border-t-colorBorder w-full block"></span>

        <UpdateBio setIsSuccess={setIsSuccess} setIsError={setIsError} />

        <AnimatePresence>
          {isSuccess || isError ? (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed mx-auto w-60 top-20 left-0 right-0 rounded-lg drop-shadow-xl bg-softBlack border ${isSuccess ? "border-primary" : "border-red-600"}`}>
              <span
                className={`block px-5 py-1 text-center font-bold ${isSuccess ? "text-primary" : "text-red-600"}`}>
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

export default SettingProfilePage;
