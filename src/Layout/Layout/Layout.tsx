import "./Layout.scss";
import { BrowserRouter, useLocation } from "react-router-dom";
import { FC } from "react";
import Header from "../../Components/Header/Header";
import SideBar from "../../Components/SideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import AppRoutes from "../../Routes/AppRoutes";

interface LayoutProps {}

const LayoutContent: FC = () => {
  const location = useLocation();
  const isLeaderboardRoute = location.pathname === "/leaderboard";
  const isSpinWheelRoute = location.pathname === "/reward-challenge";
  const isQuizAdminRoute = location.pathname === "/quiz-admin";
  const isLoginRoute = location.pathname === "/login";

  // If on login page, render only the routes (login page handles its own layout)
  if (isLoginRoute) {
    return <AppRoutes />;
  }

  return (
    <div className="Layout">
      {!(isLeaderboardRoute || isSpinWheelRoute || isQuizAdminRoute) && <Header />}
      <div className="main">
        {!(isLeaderboardRoute || isSpinWheelRoute || isQuizAdminRoute) && <SideBar />}
        <main
          className={
            isLeaderboardRoute || isSpinWheelRoute || isQuizAdminRoute ? "body full-width" : "body"
          }
        >
          <AppRoutes />
        </main>
      </div>
      {!(isLeaderboardRoute || isSpinWheelRoute || isQuizAdminRoute) && <Footer />}
    </div>
  );
};

const Layout: FC<LayoutProps> = () => (
  <BrowserRouter>
    <LayoutContent />
  </BrowserRouter>
);

export default Layout;
