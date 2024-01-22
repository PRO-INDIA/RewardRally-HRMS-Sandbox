import "./Layout.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { FC } from "react";
import Header from "../../Components/Header/Header";
import SideBar from "../../Components/SideBar/SideBar";
import PersonalInfo from "../../Components/PersonalInfo/PersonalInfo";
import Compentency from "../../Components/Compentency/Compentency";
import WorkHistroy from "../../Components/WorkHistroy/WorkHistroy";
import TimeSheet from "../../Components/TimeSheet/TimeSheet";
import LeavesComponent from "../../Components/Leave/Leave";
import Footer from "../../Components/Footer/Footer";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => (
  <div className="Layout">
    <Header />
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
    <Footer />
  </div>
);

export default Layout;
