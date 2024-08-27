import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { IoAddSharp, IoSearchOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

function Navbar() {
  const [navModal, setNavModal] = useState(false);

  return (
    <header className="fixed w-full flex justify-between items-center px-96 py-1 border-b border-b-colorBorder shadow-lg bg-black">
      <div className="w-[180px]">
        <Link>
          <img
            src="https://res.cloudinary.com/dtmtphyux/image/upload/v1724742165/gamesantara-logo.png"
            alt="Game Santara"
          />
        </Link>
      </div>
      <nav className="flex gap-x-5">
        <div className="hover:bg-gray-700 p-2 transition">
          <IoSearchOutline size={25} />
        </div>
        <div className="hover:bg-gray-700 p-2 transition">
          <IoAddSharp size={25} />
        </div>
        <AnimatePresence>
          <div className="relative">
            <button
              onClick={() => setNavModal(!navModal)}
              className="hover:bg-gray-700 p-2 transition">
              <FaUserCircle size={25} />
            </button>
            {navModal && (
              <motion.ul
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border border-borderBottom rounded-md absolute -right-8 top-12 bg-black shadow-lg ">
                <li className="flex items-center gap-4 px-4 py-2 border-b border-borderBottom hover:bg-gray-700 transition">
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
