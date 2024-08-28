import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { IoAddSharp, IoSearchOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

function Navbar() {
  const [navModal, setNavModal] = useState(false);

  return (
    <header className="fixed z-50 w-full flex justify-around items-center px-96 py-1 border-b border-b-colorBorder shadow-lg bg-black">
      <div className="w-4/12 ">
        <div className="w-[180px]">
          <Link>
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
        <div className="p-2 transition group">
          <IoAddSharp
            size={25}
            className="group-hover:text-red-600 transition"
          />
        </div>
        <AnimatePresence>
          <div className="relative">
            <button
              onClick={() => setNavModal(!navModal)}
              className="p-2 transition group">
              <FaUserCircle
                size={25}
                className="group-hover:text-red-600 transition"
              />
            </button>
            {navModal && (
              <motion.ul
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border border-colorBorder rounded-md absolute -right-8 top-12 bg-black shadow-lg ">
                <li className="flex items-center gap-4 px-4 py-2 border-b border-colorBorder hover:bg-gray-700 transition">
                  <FaUser /> Profile
                </li>
                <li className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 transition">
                  <MdLogout /> Keluar
                </li>
              </motion.ul>
            )}
          </div>
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Navbar;
