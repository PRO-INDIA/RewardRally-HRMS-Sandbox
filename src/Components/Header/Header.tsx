import "./Header.scss";
import { FC, useEffect } from "react";
import { initializeClientCredentials, RewardRally } from "@stagetheproindia/react-rewardrally";
import { environment } from "../../Environments/Environment";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  useEffect(() => {
    initializeClientCredentials(environment.clientId, environment.clientSecret);
  }, []);

  const rewardRallyOptions = {
    editableUser: true,
    hideProfile: false,
    showTabDefault: false,
  };

  return (
    <div className="header" data-testid="Header">
      <header>
        <div className="logo-name">
          <img className="logo" src="../assets/images/flag.png" alt="logo" />
          <span>Reward Rally</span>
        </div>
        <div className="gamification-package">
          <RewardRally
            userId={environment.gamification.userId}
            applicationId={environment.gamification.applicationId}
            options={rewardRallyOptions}
          />
        </div>
      </header>
    </div>
  );
};

export default Header;
