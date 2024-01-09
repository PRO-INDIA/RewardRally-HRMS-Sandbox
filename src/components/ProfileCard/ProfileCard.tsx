import React, { FC } from "react";
import "./ProfileCard.scss";

interface ProfileCardProps {}

const ProfileCard: FC<ProfileCardProps> = () => (
  <div>
    <div className="user-name">Welcome Amey !</div>
    <div className="profile-card">
      <div className="profile-container">
        <div className="profile-image-container">
          <img
            src="../assets/images/profile.svg"
            alt=""
            className="profile-image"
          />
        </div>
        <div className="label-container">
          <div>
            <label className="text-color">Name:</label>
            <span>&nbsp;Amey</span>
          </div>
          <div>
            <label className="text-color">Emp ID:</label>
            <span>&nbsp;0065</span>
          </div>
        </div>
        <div className="label-container">
          <div>
            <label className="text-color">Department:</label>
            <span>&nbsp;Tech</span>
          </div>
          <div>
            <label className="text-color">Designation:</label>
            <span>&nbsp;Tester</span>
          </div>
        </div>
        <div className="label-container">
          <div>
            <label className="text-color">Reporting Manager:</label>
            <span>&nbsp;Amal</span>
          </div>
          <div>
            <label className="text-color">Location:</label>
            <span>&nbsp;Chennai</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileCard;
