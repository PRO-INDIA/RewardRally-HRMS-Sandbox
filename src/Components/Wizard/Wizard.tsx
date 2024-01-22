import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Wizard.scss";
const Wizard = () => {
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState<string>("");

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname]);

  return (
    <div className="wizard">
      <div>
        {currentRoute === "/information/personal-info" && (
          <img
            src="../../../assets/images/onboardingwizard-1.svg"
            alt="Image 1"
            className="max-h-full max-w-full"
          />
        )}
        {currentRoute === "/information/work-history" && (
          <img
            src="../../../assets/images/onboardingwizard-3.svg"
            alt="Image 2"
            className="max-h-full max-w-full"
          />
        )}
        {currentRoute === "/information/competency" && (
          <img
            src="../../../assets/images/onboardingwizard-2.svg"
            alt="Image 2"
            className="max-h-full max-w-full"
          />
        )}
        {currentRoute !== "/information/personal-info" &&
          currentRoute !== "/information/work-history" &&
          currentRoute !== "/information/competency" && (
            <img
              src="../../../assets/images/onboardingwizard-1.svg"
              alt="Default Image"
              className="max-h-full max-w-full"
            />
          )}
      </div>
    </div>
  );
};

export default Wizard;
