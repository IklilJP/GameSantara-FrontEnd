import { AnimatePresence, motion } from "framer-motion";
import MainLayout from "../components/MainLayout";
import { useEffect, useState } from "react";
import UpdateUsername from "../components/Settings/UpdateUsername";
import UpdateProfilePicture from "../components/Settings/UpdateProfilePicture";
import UpdateFullName from "../components/Settings/UpdateFullName";
import UpdateBio from "../components/Settings/UpdateBio";
import Alert from "../components/Alert";

const SettingProfilePage = () => {
  const [isError, setIsError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsSuccess(null);
      setIsError(null);
    }, 2000);

    return () => clearTimeout(timeOut);
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
            <Alert isSuccess={isSuccess} isError={isError} />
          ) : (
            ""
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default SettingProfilePage;
