import { useState } from "react";
import "./Leave.scss";
interface LeaveApprovalForm {
  leaveType: string;
  fromDate: string;
  toDate: string;
  firstHalf: boolean;
  secondHalf: boolean;
  reason: string;
}
const LeavesComponent = () => {
  const [leaveApprovalForm, setLeaveApprovalForm] = useState<LeaveApprovalForm>(() => {
    const storedData = sessionStorage.getItem("leaveApprovalForm");
    return storedData
      ? JSON.parse(storedData)
      : {
          leaveType: "",
          fromDate: "",
          toDate: "",
          firstHalf: false,
          secondHalf: false,
          reason: "",
        };
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
        setRewardPoints(10);
        toggleContrtsPopup();
      }
    }
    handleToggle();
    // sessionStorage.setItem(
    //   "leaveApprovalForm",
    //   JSON.stringify(leaveApprovalForm)
    // );
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
  const handleToggle = () => {
    setIsActivecongrats(!isActivecongrats);
  };

  return (
    <div>
      {isActivecongrats && (
        <div className="modal-wrap">
          <div className="modal-content text-center">
            <div onClick={handleToggle} className="close-icon-competency">
              <img
                src="../../../assets/images/close.svg"
                className="cursor-pointer"
                alt="closeIcon"
              />
            </div>
            <div className="congrats-img">
              <img
                src="../../../assets/images/congragulations.svg"
                alt="popup"
              />
            </div>
            <div className="congrats-title">Congratulations!</div>
            <div className="congrats-description">
              You have completed second step sucessfully and earned
              <span className="reward-points"> 20 </span>
              Points
            </div>
          </div>
        </div>
      )}

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
                <form className="form-leave">
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

                    <div className="to-date width-96 ">
                      <label htmlFor="toDate" className="leave-type-label">
                        To Date
                      </label>
                      <input
                        type="date"
                        id="toDate"
                        className="width-100 leave-history-inputs"
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
                      placeholder="Reason"
                      id="reason"
                      className="reason-textarea"
                      name="reason"
                      onChange={handleChange}
                      value={leaveApprovalForm.reason}
                    ></textarea>
                  </div>

                  <div className="align-center">
                    <button
                      type="button"
                      onClick={onSubmit}
                      className="leave-submit-btn"
                    >
                      Apply
                    </button>
                  </div>
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
