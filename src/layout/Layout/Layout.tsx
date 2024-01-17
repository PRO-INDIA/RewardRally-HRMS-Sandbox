import "./Layout.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Compentency from "../../components/compentency/compentency";
import { FC } from "react";
import Header from "../../components/header/header";
import LeavesComponent from "../../components/Leave/Leave";
import PersonalInfo from "../../components/PersonalInfo/PersonalInfo";
import SideBar from "../../components/SideBar/SideBar";
import TimeSheet from "../../components/TimeSheet/TimeSheet";
import WorkHistroy from "../../components/WorkHistroy/WorkHistroy";
import Footer from "../../components/Footer/Footer";

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
		<Footer/>
	</div>
);

export default Layout;
