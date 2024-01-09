import { FC, useState } from "react";
import "./WorkHistroy.scss";
import Wizard from "../Wizard/Wizard";
import ProfileCard from "../ProfileCard/ProfileCard";
interface WorkHistroyProps {}

const WorkHistroy: FC<WorkHistroyProps> = () => {
  const [isActivecongrats, setisActivecongrats] = useState(false);
  const [workHistroyForm, setworkHistroyForm] = useState({
    workHistories: [
      { companyName: "", durationFrom: "", durationTo: "", certificate: "" },
    ],
  });
  const handleToggle = () => {
    setisActivecongrats(!isActivecongrats);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updatedworkHistories: any = [...workHistroyForm.workHistories];
    updatedworkHistories[index][field] = value;
    setworkHistroyForm({ workHistories: updatedworkHistories });
  };

  const addCompetency = () => {
    setworkHistroyForm((prevForm) => ({
      workHistories: [
        ...prevForm.workHistories,
        { companyName: "", durationFrom: "", durationTo: "", certificate: "" },
      ],
    }));
  };

  const removeCompetency = (index: number) => {
    const updatedworkHistories = [...workHistroyForm.workHistories];
    updatedworkHistories.splice(index, 1);
    setworkHistroyForm({ workHistories: updatedworkHistories });
  };

  const handleSubmit = () => {
    console.log(workHistroyForm);
    handleToggle();
  };

  return (
    <div className="competency">
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
      <ProfileCard />
      <div className="form-container main-container">
        <Wizard />
        <form>
          <div>
            <div>
              {workHistroyForm.workHistories.map((competency, index) => (
                <div key={index}>
                  <div className="flex-container">
                    <div>
                      <label className="label-style">Company Name</label>
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={competency.companyName}
                        onChange={(e) =>
                          handleChange(index, "companyName", e.target.value)
                        }
                        className="input-style-competency "
                      />
                    </div>
                    <div>
                      <label className="label-style">
                        Relieving Certificate
                      </label>
                      <input
                        type="file"
                        id="certificate"
                        onChange={(e) =>
                          handleChange(index, "certificate", e.target.value)
                        }
                        className="input-style-competency "
                      />
                    </div>
                  </div>
                  <div className="flex-container">
                    <div>
                      <label className="label-style">Duration From</label>
                      <input
                        type="date"
                        onChange={(e) =>
                          handleChange(index, "durationFrom", e.target.value)
                        }
                        className="input-style-competency "
                      />
                    </div>
                    <div>
                      <label className="label-style">Duration To</label>
                      <input
                        type="date"
                        onChange={(e) =>
                          handleChange(index, "durationTo", e.target.value)
                        }
                        className="input-style-competency "
                      />
                    </div>
                  </div>
                  {workHistroyForm.workHistories.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCompetency(index)}
                      className="remove-button"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button type="button" onClick={addCompetency} className="add-button">
            + Add
          </button>
          <div className="submit-container">
            <button
              type="button"
              onClick={handleSubmit}
              className="submit-button"
            >
              Update
            </button>
          </div>
        </form>
        <div className="navigate-actions">
          <a href="/information/competency">&lt; Previous</a>
          <a className="disabled-link">Next &gt;</a>
        </div>
      </div>
    </div>
  );
};

export default WorkHistroy;
