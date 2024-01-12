import React, { FC, useState, useEffect } from "react";
import "./TimeSheet.scss";

interface TimeSheetProps {}

const TimeSheet: FC<TimeSheetProps> = () => {
  const [isActivecongrats, setIsActivecongrats] = useState(false);
  const [timesheetForm, setTimesheetForm] = useState({
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
    const updatedProjects: any = [...timesheetForm.projects];
    updatedProjects[index][field] = value;
    setTimesheetForm({ projects: updatedProjects });
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

  const removeProject = (index: number) => {
    const updatedProjects = [...timesheetForm.projects];
    updatedProjects.splice(index, 1);
    setTimesheetForm({ projects: updatedProjects });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleToggle();
    console.log(timesheetForm, "timesheetForm");
  };

  return (
    <div>
      <div className="timesheet-container">
        <div className="header">
          <div className="timesheet-header">Time Sheet - Weekly</div>
          <div className="navigate-actions-timesheet">
            <div className="title-timesheet">
              THIS WEEK, 18 DEC 2023 - 22 DEC 2023
            </div>
            <div className="navigations">
              <div>&lt; Previous</div>
              <div>Next &gt;</div>
            </div>
          </div>
        </div>
        <form className="main-container timesheet-content" onSubmit={onSubmit}>
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
                    <select
                      className="timesheet-projectname"
                      id={`projectName-${index}`}
                      onChange={(e) =>
                        handleChange(index, "projectName", e.target.value)
                      }
                    >
                      <option value="" disabled selected>
                        Select
                      </option>
                      <option>MetLife</option>
                      <option>Mercury Insurance</option>
                      <option>SBI Life</option>
                    </select>
                    <div>
                      <input
                        placeholder="Task"
                        className="task-name"
                        type="text"
                        id={`responsibility-${index}`}
                        onChange={(e) =>
                          handleChange(index, "responsibility", e.target.value)
                        }
                      />
                    </div>
                    {daysOfWeek.map((day, dayIndex) => (
                      <div key={dayIndex}>
                        <input
                          className="timesheet-inputs-types"
                          type="text"
                          id={`${day.toLowerCase()}-${index}`}
                          disabled={day !== currentDay}
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
      </div>
      {isActivecongrats && (
        <div className="modal-wrap">
          <div className="modal-content text-center">
            <div className="flex justify-end top-0">
              <img
                src="../../../assets/images/close.svg"
                className="cursor-pointer"
                onClick={handleToggle}
                alt="closeIcon"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="../../../assets/images/congragulations.svg"
                alt="popup"
              />
            </div>
            <div className="text-2xl my-4">Congratulations!</div>
            <div className="text-base mb-5">
              You have successfully completed the Timesheet and earned
              <span className="text-orange-600 font-bold">20</span> Points
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSheet;
