import "./TimeSheet.scss";

import React, { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";

import { environment } from "../../Environments/Environment";
import { updateGameAction } from "@stagetheproindia/react-progamification";

interface TimeSheetProps {}

interface Project {
  projectName: string;
  responsibility: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
}

interface TimeSheetForm {
  projects: Project[];
}

const TimeSheet: FC<TimeSheetProps> = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<TimeSheetForm>();

  const [isActivecongrats, setIsActivecongrats] = useState(false);
  const [timesheetForm, setTimesheetForm] = useState<TimeSheetForm>({
    projects: [
      {
        projectName: "",
        responsibility: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
      },
    ],
  });
  const [currentDay, setCurrentDay] = useState<string>(getToday());
  const [currentWeek, setCurrentWeek] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 4);
    const formattedStartDate = `${startDate.getDate()} ${startDate.toLocaleString('default', { month: 'short' })} ${startDate.getFullYear()}`;
    const formattedEndDate = `${endDate.getDate()} ${endDate.toLocaleString('default', { month: 'short' })} ${endDate.getFullYear()}`;
    const currentWeekString = `THIS WEEK, ${formattedStartDate} - ${formattedEndDate}`;
    setCurrentWeek(currentWeekString);
  }, []);
  const [updatedPoints, setPoints] = useState<number>(0);
  const [toTalWorkingHours, setTotalWorkingHours] = useState<number>(0);

  const triggerGameAction = async () => {
    const res = await updateGameAction(
      environment.gamification.userId,
      environment.gamification.timeSheetSubmission,
      "",
      ""
    );

    setPoints(res.data.data.points);
    handleToggle();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDay(getToday());
    }, 1000 * 60);

    return () => clearInterval(intervalId);
  }, []);

  const handleToggle = () => {
    setIsActivecongrats(!isActivecongrats);
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  function getToday(): string {
    const today = new Date();
    const options: any = { weekday: "long" };
    return today.toLocaleDateString("en-US", options);
  }

  const handleChange = (index: number, field: string, value: string) => {
    const updatedProjects: Project[] = [...timesheetForm.projects];
    updatedProjects[index][field as keyof Project] = value;
    setTimesheetForm({ projects: updatedProjects });

    const mondayTotal = updatedProjects.reduce((total, project) => {
      const mondayValue = parseInt(project.monday, 10) || 0;
      return total + mondayValue;
    }, 0);
    setTotalWorkingHours(mondayTotal);
  };

  const addProject = () => {
    setTimesheetForm((prevForm) => ({
      projects: [
        ...prevForm.projects,
        {
          projectName: "",
          responsibility: "",
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
        },
      ],
    }));
  };

  const onSubmit: SubmitHandler<TimeSheetForm> = async (data) => {
    triggerGameAction();
  };

  return (
    <div className="timesheet">
      <div className="timesheet-container">
        <div className="header">
          <div className="timesheet-header py-3">Time Sheet - Weekly</div>
          <div className="navigate-actions-timesheet">
            <div className="title-timesheet py-3">
            {currentWeek}
            </div>
          </div>
        </div>
        <form
          className="main-container timesheet-content"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="timesheet-flex-container">
              <label className="project-title">Project</label>
              <label className="responsible-title">Responsibility</label>
              <div className="timesheet-days">
                {daysOfWeek.map((day, index) => (
                  <label className="timesheet-dates" key={index}>
                    {day}
                  </label>
                ))}
              </div>
            </div>
            <div className="timesheet-inputs">
              {timesheetForm.projects.map((project, index) => (
                <div key={index} className="project-row">
                  <div className="timesheet-flex-container">
                    <div className="error-message-display">
                      <select
                        className="timesheet-projectname"
                        {...register(`projects.${index}.projectName`, {
                          required: true,
                        })}
                        onBlur={(e) => {
                          handleChange(index, "projectName", e.target.value);
                        }}
                      >
                        <option value="" disabled selected>
                          Select
                        </option>
                        <option>MetLife</option>
                        <option>Mercury Insurance</option>
                        <option>SBI Life</option>
                      </select>
                      <div>
                        {errors?.projects?.[index]?.projectName && (
                          <p className="error-message">
                            Project Name is required
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="error-message-display">
                      <input
                        placeholder="Task"
                        className="task-name"
                        type="text"
                        {...register(`projects.${index}.responsibility`, {
                          required: true,
                        })}
                        onBlur={(e) => {
                          setValue(
                            `projects.${index}.responsibility`,
                            e.target.value
                          );
                          handleChange(index, "responsibility", e.target.value);
                        }}
                      />
                      <div>
                        {errors?.projects?.[index]?.responsibility && (
                          <p className="error-message">
                            Responsibility is required
                          </p>
                        )}
                      </div>
                    </div>
                    {daysOfWeek.map((day, dayIndex) => (
                      <div key={dayIndex}>
                        <input
                          className="timesheet-inputs-types"
                          type="text"
                          step="0.01" 
                          id={`${day.toLowerCase()}-${dayIndex}`}
                          disabled={day.toLowerCase() !== "monday"}
                          onChange={(e) =>
                            handleChange(
                              index,
                              day.toLowerCase(),
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="add-btn-align">
              <button
                type="button"
                className="btn-timesheet"
                onClick={addProject}
              >
                Add Project
              </button>
            </div>
          </div>
          <div className="empty-div"></div>
          <div className="flex-center">
            <button className="btn-timesheet" type="submit">
              Submit
            </button>
          </div>
        </form>
        <div className="timesheet-total">
          <div className="total-label"> TOTAL</div>
          <div className="totalcount-days">
            {daysOfWeek.map((day, dayIndex) => (
              <div key={dayIndex}>
                <input
                  className="timesheet-inputs-types"
                  type="number"
                  value={
                    day.toLowerCase() === "monday" ? toTalWorkingHours : ""
                  }
                  id={`${day.toLowerCase()}-${dayIndex}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {isActivecongrats && (
        <div className="modal-wrap">
          <div className="modalcontent text-center">
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
              You have completed second step successfully and earned
              <span className="reward-points"> {updatedPoints} </span>
              Points
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSheet;
