import "./Layout.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { FC } from "react";

import Compentency from "../../components/compentency/compentency";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/header/header";
interface LayoutProps {}

const Layout: FC<LayoutProps> = () => (
	<div className="Layout">
		<Header />
		<div className="main">
			<BrowserRouter>
				<SideBar />
				<main className="body">
					<Routes>
						<Route path="/" element={<Compentency />} />
						<Route
							path="/information/personal-info"
							element={<Compentency />}
						/>
						<Route path="/information/competency" element={<Compentency />} />
					</Routes>
				</main>
			</BrowserRouter>
		</div>
	</div>
);

export default Layout;
