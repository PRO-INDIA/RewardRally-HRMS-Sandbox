import "./header.scss";
import { environment } from "../../environments/environment";
import { FC } from "react";

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
        userId={environment.gamification.userId}
        applicationId={environment.gamification.applicationId}
        clientId={environment.clientId}
        clientSecret={environment.clientSecret}
      />
    </header>
  </div>
);

export default Header;
