import React, { useState } from "react";
import "./Leave.scss";
const LeavesComponent = () => {
  const [leaveApprovalForm, setLeaveApprovalForm] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    firstHalf: false,
    secondHalf: false,
    reason: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [showLeaveApply, setShowLeaveApply] = useState(false);
  const [rewardPoints, setRewardPoints] = useState({});
  const [isActivecongrats, setIsActivecongrats] = useState(false);

  const gameConfigs = {};

  const onSubmit = async () => {
    setShowLeaveApply(true);
    setRewardPoints(0);
    if (
      leaveApprovalForm.leaveType &&
      leaveApprovalForm.fromDate &&
      leaveApprovalForm.toDate &&
      leaveApprovalForm.reason
    ) {
      if (leaveApprovalForm.leaveType === "casual") {
        setRewardPoints(10);
        toggleContrtsPopup();
      } else if (leaveApprovalForm.leaveType === "earned") {
        setRewardPoints(10); // You can replace this with actual logic
        toggleContrtsPopup();
      }
    }
  };

  const toggleContrtsPopup = () => {
    setIsActivecongrats(!isActivecongrats);
  };

  const toggleLeaveApply = () => {
    setShowLeaveApply(!showLeaveApply);
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setLeaveApprovalForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div>
      {/* {isActivecongrats && (
        <div className="modal-wrap">
          <div className="modal-content text-center">
            <div className="flex justify-end top-0">
              <img
                src="../../../assets/images/close.svg"
                className="cursor-pointer"
                onClick={toggleContrtsPopup}
                alt="closeIcon"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="../../../assets/images/congragulations.svg"
                alt="popup"
              />
            </div>
            <div className="text-2xl text-black my-4">Congratulations!</div>
            <div className="text-base text-black mb-5">
              Your leave has been applied successfully and earned
              <span className="text-orange-600 font-bold"></span>
              Points
            </div>
          </div>
        </div>
      )} */}

      <div className="leave-container">
        <span className="leave-title">Leave Management</span>
        <div className="leave-image-container ">
          <div className="header-image">
            <img
              src="../../../assets/images/lm-card-1.svg"
              alt="Image 1"
              className="leave-image"
            />
          </div>
          <div className="header-image">
            <img
              src="../../../assets/images/lm-card-2.svg"
              alt="Image 2"
              className="leave-image"
            />
          </div>
          <div className="header-image">
            <img
              src="../../../assets/images/lm-card-3.svg"
              alt="Image 3"
              className="leave-image"
            />
          </div>
          <div className="header-image">
            <img
              src="../../../assets/images/lm-card-4.svg"
              alt="Image 4"
              className="leave-image"
            />
          </div>
        </div>

        <div className="leave-form-container">
          <div className="calendar-image">
            <img
              src="../../../assets/images/leavecalendar_new.svg"
              alt="calander"
              className="leave-calendar-image"
            />
          </div>
          <div className="leave-history-container">
            {!showLeaveApply && (
              <div>
                <div className="leave-title">
                  <span>Leave History</span>
                  <button
                    onClick={toggleLeaveApply}
                    className="leave-apply-btn"
                  >
                    Apply Leave
                  </button>
                </div>
                <div className="leave-history-image">
                  <img
                    src="../../../assets/images/leave history.svg"
                    alt="calander"
                    className="width-100"
                  />
                </div>
              </div>
            )}
            <div>
              {showLeaveApply && (
                <form onSubmit={onSubmit} className="form-leave">
                  <div className="leave-type-container">
                    <label htmlFor="leaveType" className="leave-type-label">
                      Leave Type
                    </label>
                    <select
                      id="leaveType"
                      className="width-96 leave-history-inputs"
                      name="leaveType"
                      onChange={handleChange}
                      value={leaveApprovalForm.leaveType}
                    >
                      <option value="" disabled selected>
                        Select Leave Type
                      </option>
                      <option value="sick">Sick Leave</option>
                      <option value="casual">Casual Leave</option>
                      <option value="earned">Earned Leave</option>
                    </select>
                  </div>

                  <div className="leave-dates-container">
                    <div className="from-date width-96">
                      <label htmlFor="fromDate" className="leave-type-label">
                        From Date
                      </label>
                      <input
                        type="date"
                        id="fromDate"
                        className="width-100 leave-history-inputs"
                        name="fromDate"
                        onChange={handleChange}
                        value={leaveApprovalForm.fromDate}
                      />
                    </div>

                    <div className="to-date ">
                      <label htmlFor="toDate" className="leave-type-label">
                        To Date
                      </label>
                      <input
                        type="date"
                        id="toDate"
                        className="width-96 leave-history-inputs"
                        name="toDate"
                        onChange={handleChange}
                        value={leaveApprovalForm.toDate}
                      />
                    </div>
                  </div>

                  <div className="first-half-container">
                    <label className="half-leave-label">
                      <input
                        type="checkbox"
                        name="firstHalf"
                        className="checkbox-leave"
                        onChange={handleChange}
                        checked={leaveApprovalForm.firstHalf}
                      />
                      <span className="ml-2">First Half</span>
                    </label>
                    <label className="half-leave-label">
                      <input
                        type="checkbox"
                        name="secondHalf"
                        className="checkbox-leave"
                        onChange={handleChange}
                        checked={leaveApprovalForm.secondHalf}
                      />
                      <span className="ml-2">Second Half</span>
                    </label>
                  </div>

                  <div className="leave-reason">
                    <label htmlFor="reason" className="leave-type-label">
                      Reason
                    </label>
                    <textarea
                      placeholder="Reason for Leave"
                      id="reason"
                      className="reason-textarea"
                      name="reason"
                      onChange={handleChange}
                      value={leaveApprovalForm.reason}
                    ></textarea>
                  </div>

                  <button type="submit" className="leave-submit-btn">
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeavesComponent;
