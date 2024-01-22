import { updateGameAction } from "@stagetheproindia/react-progamification";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Leave.scss";
import { environment } from "../../Environments/Environment";

interface LeaveApprovalForm {
  leaveType: string;
  fromDate: string;
  toDate: string;
  firstHalf: boolean;
  secondHalf: boolean;
  reason: string;
}

const LeavesComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeaveApprovalForm>();

  const [leaveApprovalForm, setLeaveApprovalForm] = useState<LeaveApprovalForm>(
    () => {
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
    }
  );

  const [showLeaveApply, setShowLeaveApply] = useState(false);
  const [isActivecongrats, setIsActivecongrats] = useState(false);
  const [updatedPoints, setPoints] = useState<number>(0);

  const triggerGameAction = async (gameActionId: string) => {
    const res = await updateGameAction(
      environment.gamification.userId,
      gameActionId,
      "",
      ""
    );

    setPoints(res.data.data.points);
    handleToggle();
  };

  const onSubmit = async () => {
    setPoints(0);
    setShowLeaveApply(true);
    if (
      leaveApprovalForm.leaveType &&
      leaveApprovalForm.fromDate &&
      leaveApprovalForm.toDate &&
      leaveApprovalForm.reason
    ) {
      if (leaveApprovalForm.leaveType === "casual") {
        await triggerGameAction(environment.gamification.casualLeaveAction);
      } else if (leaveApprovalForm.leaveType === "earned") {
        await triggerGameAction(environment.gamification.earnedLeaveAction);
      }
    }

    sessionStorage.setItem(
      "leaveApprovalForm",
      JSON.stringify(leaveApprovalForm)
    );
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
              You have completed the second step successfully and earned
              <span className="reward-points"> {updatedPoints} </span>
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
              alt="calendar"
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
                    alt="calendar"
                    className="width-100"
                  />
                </div>
              </div>
            )}
            <div>
              {showLeaveApply && (
                <form className="form-leave" onSubmit={handleSubmit(onSubmit)}>
                  <div className="leave-type-container">
                    <label htmlFor="leaveType" className="leave-type-label">
                      Leave Type
                    </label>
                    <select
                      id="leaveType"
                      className="width-96 leave-history-inputs"
                      {...register("leaveType", {
                        required: "Leave type is required",
                      })}
                      name="leaveType"
                      onChange={handleChange}
                      value={leaveApprovalForm.leaveType}
                    >
                      <option value="" disabled>
                        Select Leave Type
                      </option>
                      <option value="sick">Sick Leave</option>
                      <option value="casual">Casual Leave</option>
                      <option value="earned">Earned Leave</option>
                    </select>
                    {errors.leaveType && (
                      <p className="error-message">
                        {errors.leaveType.message}
                      </p>
                    )}
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
                        {...register("fromDate", {
                          required: "From Date is required",
                        })}
                        name="fromDate"
                        onChange={handleChange}
                        value={leaveApprovalForm.fromDate}
                      />
                      {errors.fromDate && (
                        <p className="error-message">
                          {errors.fromDate.message}
                        </p>
                      )}
                    </div>

                    <div className="to-date width-96 ">
                      <label htmlFor="toDate" className="leave-type-label">
                        To Date
                      </label>
                      <input
                        type="date"
                        id="toDate"
                        className="width-100 leave-history-inputs"
                        {...register("toDate", {
                          required: "To Date is required",
                        })}
                        name="toDate"
                        onChange={handleChange}
                        value={leaveApprovalForm.toDate}
                      />
                      {errors.toDate && (
                        <p className="error-message">{errors.toDate.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="first-half-container">
                    <label className="half-leave-label">
                      <input
                        type="checkbox"
                        className="checkbox-leave"
                        {...register("firstHalf")}
                        checked={leaveApprovalForm.firstHalf}
                        onChange={handleChange}
                      />
                      <span className="ml-2">First Half</span>
                    </label>
                    <label className="half-leave-label">
                      <input
                        type="checkbox"
                        className="checkbox-leave"
                        {...register("secondHalf")}
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
                      {...register("reason", {
                        required: "Reason is required",
                      })}
                      name="reason"
                      onChange={handleChange}
                      value={leaveApprovalForm.reason}
                    ></textarea>
                    {errors.reason && (
                      <p className="error-message">{errors.reason.message}</p>
                    )}
                  </div>

                  <div className="align-center">
                    <button type="submit" className="leave-submit-btn">
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
