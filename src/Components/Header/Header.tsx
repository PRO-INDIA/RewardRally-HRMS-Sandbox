import "./Header.scss";

import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { RewardRally } from "@theproindia/react-rewardrally";
import { environment } from "../../Environments/Environment";
import { useAuth } from "../../Context/AuthContext";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
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
        <div className="user-actions">
          {user && (
            <div className="user-info">
              <span className="user-email">{user.email}</span>
              <button className="logout-btn" onClick={handleLogout}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
