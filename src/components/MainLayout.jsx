import Navbar from "./Navbar";
import SideBarLeft from "./SideBarLeft";
import SideBarRight from "./SideBarRight";

const MainLayout = ({ children }) => {
  return (
    <div className="mx-auto h-screen overflow-hidden">
      <Navbar />
      <div className="flex gap-4 pt-10 h-full overflow-y-auto">
        <div className="sidebar w-[10%] fixed left-[19%] top-16 bottom-0 overflow-y-auto">
          <SideBarLeft />
        </div>

        <div className="w-5/12 mx-auto">
          <main className="border-l border-l-colorBorder border-r border-r-colorBorder mx-auto px-6 min-h-screen">
            {children}
          </main>
        </div>
        <div className="sidebar w-[15%] fixed right-[14%] top-16 bottom-0 overflow-y-auto">
          <SideBarRight />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
