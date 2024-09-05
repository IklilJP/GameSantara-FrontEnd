import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { IoAddSharp, IoSearchOutline } from "react-icons/io5";
import { MdLogout, MdOutlineLogin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { RiEditBoxLine } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import Alert from "./Alert";

function Navbar() {
  const [navModal, setNavModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userLogin = useSelector((state) => state.auth.userDetail);
  const [isError, setIsError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const resultAction = await dispatch(logout()).unwrap();
      console.log("User berhasil logout :", resultAction);
      navigate("/login");
    } catch (err) {
      isError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateThread = () => {
    if (!userLogin) {
      setIsError("Silahkan login terlebih dahulu");
      return;
    } else {
      navigate("/create/thread");
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsError(null);
    }, 2000);

    return () => clearTimeout(timeOut);
  }, [isError]);

  return (
    <header className="fixed z-50 w-full flex justify-around items-center px-96 py-1 border-b border-b-colorBorder shadow-lg bg-black">
      <div className="w-4/12 ">
        <div className="w-[180px]">
          <Link to={"/"}>
            <img
              src="https://res.cloudinary.com/dpofjmzdu/image/upload/v1724813277/logo-header.png"
              alt="Game Santara"
            />
          </Link>
        </div>
      </div>

      <div className="transition group flex items-center gap-2 border border-colorBorder rounded-full px-4 bg-softBlack w-5/12">
        <IoSearchOutline
          size={20}
          className="group-hover:text-red-600 transition"
        />
        <input
          type="text"
          placeholder="Type here"
          className="w-full max-w-xs bg-softBlack px-2 py-1 focus-visible:outline-none"
        />
      </div>

      <nav className="flex w-4/12 justify-end">
        <button
          onClick={handleCreateThread}
          className="px-3 transition group flex justify-center items-center bg-softBlack rounded-3xl hover:bg-gray-700">
          <FiPlus
            size={20}
            className="group-hover:text-red-600 transition font-bold"
          />
          <span className="font-bold group-hover:text-red-600 transition">
            Thread
          </span>
        </button>
        <AnimatePresence>
          <div className="relative flex justify-center">
            <button
              onClick={() => setNavModal(!navModal)}
              className="transition group">
              {userLogin ? (
                <div className="w-8 ml-2">
                  <img
                    src={userLogin.profilePicture.image}
                    alt=""
                    className="rounded-full"
                  />
                </div>
              ) : (
                <div className="w-8 ml-2">
                  <FaUserCircle
                    size={25}
                    className="group-hover:text-red-600 transition"
                  />
                </div>
              )}
            </button>
            {navModal &&
              (userLogin ? (
                <motion.ul
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="border border-colorBorder rounded-md absolute -right-8 top-12 bg-black shadow-lg ">
                  <li>
                    <Link
                      to={`/user/${userLogin?.id}`}
                      className="flex items-center gap-4 px-4 py-2 border-b border-colorBorder hover:bg-gray-700 transition">
                      <FaUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 transition"
                      onClick={() => handleLogout()}>
                      <MdLogout /> Keluar
                    </button>
                  </li>
                </motion.ul>
              ) : (
                <motion.ul
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="border border-colorBorder rounded-md absolute -right-8 top-12 bg-black shadow-lg ">
                  <li>
                    <Link
                      to={"/login"}
                      className="flex items-center gap-4 px-4 py-2 border-b border-colorBorder hover:bg-gray-700 transition">
                      <MdOutlineLogin size={20} /> Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      type="button"
                      className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 transition"
                      to={"/register"}>
                      <RiEditBoxLine size={20} /> Register
                    </Link>
                  </li>
                </motion.ul>
              ))}
          </div>
        </AnimatePresence>
      </nav>
      {isLoading && (
        <div className="absolute w-full h-screen backdrop-blur-sm bg-white/10 left-0 top-0 flex justify-center items-center">
          <span className="loading loading-dots loading-lg text-red-600"></span>
        </div>
      )}
      <AnimatePresence>
        {isError && (
          <div>
            <Alert isError={isError} />
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
