import "./header.scss";

import React, { FC } from "react";

import { ProGamification } from "@stagetheproindia/react-progamification";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
	<div className="header" data-testid="Header">
		<header>
			<img src="../assets/images/product-logo.svg" alt="logo" />
			<ProGamification
				userId={"cef96b5a-2ad9-4c3d-aae1-eb6f9da6e5a8"}
				applicationId={"659645cdf65b394e53135964"}
				clientId={"08ce0068-2906-44d4-b840-b268e5511624"}
				clientSecret={"2BG8Q~Vsd33.QQ93jcejZkrr5aVyXvxbl_FrubYg"}
			/>
		</header>
	</div>
);

export default Header;
