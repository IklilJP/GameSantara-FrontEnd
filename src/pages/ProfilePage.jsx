import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import CardThread from "../components/CardThread";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { PiArrowFatUpBold, PiShareFat } from "react-icons/pi";
import MeatballMenu from "../components/MeatballMenu";
import { useSelector } from "react-redux";
import { LiaEdit } from "react-icons/lia";
import { AnimatePresence, motion } from "framer-motion";
import { FaDove } from "react-icons/fa";

function ProfilePage() {
  const [isMenu, setIsMenu] = useState(false);
  const userDetail = useSelector((state) => state.auth.userDetail);

  return (
    <MainLayout>
      <div className="py-12">
        <div className="flex px-10 justify-between">
          <div className="flex gap-6">
            <div className="w-28 h-28 rounded-full flex flex-col items-center">
              {userDetail?.profilePicture ? (
                <img
                  src={userDetail?.profilePicture.image}
                  alt="Profile Picture"
                  className="rounded-full"
                />
              ) : (
                <img
                  src="https://res.cloudinary.com/dpofjmzdu/image/upload/v1724926159/assets/pp-notfound.jpg"
                  alt="Profile Picture"
                  className="rounded-full"
                />
              )}
            </div>

            <div className="flex flex-col mt-3">
              <span className="font-bold text-2xl capitalize text-gray-200">
                {userDetail?.fullName}
              </span>
              <span className="text-lg">@{userDetail?.username}</span>

              <div className="flex gap-2">
                <div className="flex gap-2">
                  <span className="font-bold">10</span>
                  <span className="">thread</span>
                </div>
                <span>&bull;</span>
                <div className="flex gap-2">
                  <span className="font-bold">534</span>
                  <span className="">upvote</span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-10 flex justify-end items-center gap-3">
            <div>
              <PiShareFat
                size={25}
                className="group-hover:text-red-600 transition"
              />
            </div>
            <div className="relative">
              <MeatballMenu IsMenuActive={isMenu} setIsMenuActive={setIsMenu} />
              <AnimatePresence>
                {isMenu && (
                  <motion.div
                    // key="menu" // Menambahkan key unik
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute w-36 right-11 ">
                    <Link className="flex gap-2 bg-softBlack hover:bg-gray-600 py-2 px-3 border border-colorBorder rounded-lg transition">
                      <LiaEdit size={20} />
                      Edit Profile
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-t-gray-700">
          <div className="flex gap-4 justify-center w-5/12 mx-auto">
            <div className="flex justify-center px-3 py-1 border-t border-t-red-600">
              <Link className="flex gap-2 justify-center items-center text-red-600 font-semibold">
                <BsFillGrid3X3GapFill />
                <span>Thread</span>
              </Link>
            </div>
            <Link className="flex gap-2 justify-center items-center font-semibold">
              <PiArrowFatUpBold />
              <span>upvote</span>
            </Link>
          </div>
          <div className="mt-8">
            <CardThread />
            <CardThread />
            <CardThread />
            <CardThread />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default ProfilePage;
