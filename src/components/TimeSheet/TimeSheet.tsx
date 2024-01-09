import React, { FC } from 'react';
import './TimeSheet.scss';

interface TimeSheetProps {}

const TimeSheet: FC<TimeSheetProps> = () => (
  <div className="TimeSheet" data-testid="TimeSheet">
    TimeSheet Component
  </div>
);

export default TimeSheet;
