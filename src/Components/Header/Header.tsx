import "./Header.scss";
import { FC } from "react";

import { ProGamification } from "@stagetheproindia/react-progamification";
import { environment } from "../../Environments/Environment";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
  <div className="header" data-testid="Header">
    <header>
      <div className="logo-name">
        <img className="logo" src="../assets/images/flag.png" alt="logo" />
        <span>Reward Rally</span>
      </div>
      <div className="gamification-package">
        <ProGamification
          userId={environment.gamification.userId}
          applicationId={environment.gamification.applicationId}
          clientId={environment.clientId}
          clientSecret={environment.clientSecret}
        />
      </div>
    </header>
  </div>
);

export default Header;
