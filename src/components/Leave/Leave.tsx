import React, { FC } from 'react';
import './Leave.scss';

interface LeaveProps {}

const Leave: FC<LeaveProps> = () => (
  <div className="Leave" data-testid="Leave">
    Leave Component
  </div>
);

export default Leave;
