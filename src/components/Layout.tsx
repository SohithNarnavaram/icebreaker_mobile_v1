import { Outlet } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Main content area - takes space above nav */}
      <main className="flex-1 overflow-hidden pb-20">
        <Outlet />
      </main>
      {/* Fixed bottom navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Layout;