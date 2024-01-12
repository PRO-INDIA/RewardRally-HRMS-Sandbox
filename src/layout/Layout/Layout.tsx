import "./Layout.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FC } from "react";
import Compentency from "../../components/compentency/compentency";
import SideBar from "../../components/SideBar/SideBar";
import PersonalInfo from "../../components/PersonalInfo/PersonalInfo";
import WorkHistroy from "../../components/WorkHistroy/WorkHistroy";
import TimeSheet from "../../components/TimeSheet/TimeSheet";
import LeavesComponent from "../../components/Leave/Leave";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => (
  <div className="Layout">
    <header>
      <img src="../assets/images/product-logo.svg" alt="logo" />
    </header>
    <div className="main">
      <BrowserRouter>
        <SideBar />
        <main className="body">
          <Routes>
            <Route path="/" element={<PersonalInfo />} />
            <Route
              path="/information/personal-info"
              element={<PersonalInfo />}
            />
            <Route path="/information/competency" element={<Compentency />} />
            <Route path="/information/work-history" element={<WorkHistroy />} />
            <Route path="/time-sheet" element={<TimeSheet />} />
            <Route path="/leaves" element={<LeavesComponent />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  </div>
);

export default Layout;
