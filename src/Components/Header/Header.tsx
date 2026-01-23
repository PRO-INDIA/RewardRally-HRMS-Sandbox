import "./Header.scss";

import { FC } from "react";
import { RewardRally } from "@theproindia/react-rewardrally";
import { environment } from "../../Environments/Environment";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
  <div className="header" data-testid="Header">
    <header>
      <div className="logo-name">
        <img
          className="logo"
          src="https://peninsularresearchops.com/assets/svg/logo_gray.svg"
          alt="logo"
        />
      </div>
      <div className="gamification-package">
        <RewardRally
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
