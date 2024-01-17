import "./header.scss";

import React, { FC } from "react";

import { ProGamification } from "@stagetheproindia/react-progamification";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
	<div className="header" data-testid="Header">
		<header>
			<div className="logo-name">
				<img className="logo" src="../assets/images/flag.png" alt="logo" />
				<span>Reward Rally</span>
			</div>
			<ProGamification
				userId={"b171b656-039d-4243-bfe7-1c8c9af6665c"}
				applicationId={"659645cdf65b394e53135964"}
				clientId={"08ce0068-2906-44d4-b840-b268e5511624"}
				clientSecret={"2BG8Q~Vsd33.QQ93jcejZkrr5aVyXvxbl_FrubYg"}
			/>
		</header>
	</div>
);

export default Header;
