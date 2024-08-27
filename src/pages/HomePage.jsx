import React from "react";
import Navbar from "../components/Navbar";
import SideBarLeft from "../components/SideBarLeft";
import MainPage from "../components/MainPage";

function HomePage() {
  return (
    <div className="mx-auto">
      <Navbar />
      <div className="flex justify-center gap-4 h-screen pt-10">
        {/* <SideBarLeft /> */}
        <MainPage />
        {/* <aside> */}
        {/*   <p>cs</p> */}
        {/* </aside> */}
      </div>
    </div>
  );
}

export default HomePage;
