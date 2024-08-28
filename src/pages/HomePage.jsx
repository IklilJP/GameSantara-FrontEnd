import React from "react";
import Navbar from "../components/Navbar";
import MainPage from "../components/MainPage";
import SideBarLeft from "../components/SideBarLeft";
import SideBarRight from "../components/SideBarRight";

function HomePage() {
  return (
    <div className="mx-auto h-screen overflow-hidden">
      <Navbar />
      <div className="flex gap-4 pt-10 h-full overflow-y-auto">
        <div className="sidebar w-[10%] fixed left-[19%] top-16 bottom-0 overflow-y-auto">
          <SideBarLeft />
        </div>

        <div className="w-5/12 mx-auto">
          <MainPage />
        </div>

        <div className="sidebar w-[10%] fixed right-[19%] top-16 bottom-0 overflow-y-auto">
          <SideBarRight />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
