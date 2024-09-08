import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdLogout, MdOutlineLogin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { RiEditBoxLine } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import Alert from "./Alert";
import axiosInstance from "../api/axiosInstance";

function Navbar() {
  const [navModal, setNavModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const userLogin = useSelector((state) => state.auth.userDetail);
  const [isError, setIsError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const navModalRef = useRef(null);

  const handleResultClick = (threadId) => {
    navigate(`/thread/${threadId}`);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const resultAction = await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (err) {
      setIsError(err);
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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      const response = await axiosInstance.get(`/post?q=${searchQuery}`);
      console.log(response.data.data);
      setSearchResults(response.data.data);
      setIsSearching(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setIsSearching(false);
    }
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchResults([]);
    }

    if (navModalRef.current && !navModalRef.current.contains(event.target)) {
      setNavModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchResults]);

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

      <div className="relative transition group flex items-center gap-2 border border-colorBorder rounded-full px-4 bg-softBlack w-5/12">
        <IoSearchOutline
          size={20}
          className="group-hover:text-red-600 transition"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tulis judul atau deskripsi"
          className="w-full max-w-xs bg-softBlack px-2 py-1 focus-visible:outline-none"
        />
        {searchResults.length > 0 && (
          <div
            ref={searchRef}
            className="absolute top-full right-0 mt-2 w-full bg-black border border-colorBorder rounded-lg shadow-lg z-10">
            <ul className="">
              {searchResults.map((result) => (
                <li key={result.id}>
                  <Link
                    onClick={() => setSearchResults("")}
                    to={`/thread/${result.id}`}
                    className="block px-4 py-2 hover:bg-gray-700 text-white border border-colorBorder">
                    <h3 className="font-bold text-sm">{result.title}</h3>
                    <p className="line-clamp-1 text-sm">{result.body}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {isSearching && (
          <div className="absolute right-5">
            <span className="loading loading-spinner loading-sm text-red-600"></span>
          </div>
        )}
      </div>

      <nav className="flex w-4/12 justify-end">
        <button
          onClick={handleCreateThread}
          className="px-3 transition group flex justify-center items-center bg-softBlack rounded-3xl hover:bg-gray-700">
          <FiPlus
            size={20}
            className="group-hover:text-red-600 transition font-bold"
          />
          <span className="font-bold group-hover:text-red-600 transition py-1">
            Thread
          </span>
        </button>
        <AnimatePresence>
          <div className="relative flex justify-center">
            <button
              onClick={() => setNavModal(!navModal)}
              className="transition group">
              {userLogin ? (
                <div className="w-7 h-7 ml-2">
                  <img
                    className="w-7 h-7 ml-2 rounded-full"
                    src={
                      userLogin.profilePicture?.image ||
                      "https://res.cloudinary.com/dpofjmzdu/image/upload/v1724926159/assets/pp-notfound.jpg"
                    }
                    alt={userLogin.username}
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
                  ref={navModalRef}
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
                      onClick={handleLogout}>
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
