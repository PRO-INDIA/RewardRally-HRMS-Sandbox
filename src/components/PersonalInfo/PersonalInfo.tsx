import React, { FC } from 'react';
import './PersonalInfo.scss';

interface PersonalInfoProps {}

const PersonalInfo: FC<PersonalInfoProps> = () => (
  <div className="PersonalInfo" data-testid="PersonalInfo">
    PersonalInfo Component
  </div>
);

export default PersonalInfo;
