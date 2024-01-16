import { FC, useState } from "react";
import "./compentency.scss";
import Wizard from "../Wizard/Wizard";
import ProfileCard from "../ProfileCard/ProfileCard";

const CompetencyComponent: FC = () => {
  const [isActivecongrats, setisActivecongrats] = useState(false);
  const [competencyForm, setCompetencyForm] = useState(() => {
    const storedData = sessionStorage.getItem("competencyForm");
    return storedData
      ? JSON.parse(storedData)
      : {
          competencies: [
            {
              courseName: "",
              durationFrom: "",
              durationTo: "",
              certificate: "",
            },
          ],
        };
  });

  const handleToggle = () => {
    setisActivecongrats(!isActivecongrats);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updatedCompetencies: any = [...competencyForm.competencies];
    updatedCompetencies[index][field] = value;
    setCompetencyForm({ competencies: updatedCompetencies });
  };

  const addCompetency = () => {
    setCompetencyForm((prevForm: any) => ({
      competencies: [
        ...prevForm.competencies,
        {
          courseName: "",
          durationFrom: "",
          durationTo: "",
          certificate: "",
        },
      ],
    }));
  };

  const removeCompetency = (index: number) => {
    const updatedCompetencies = [...competencyForm.competencies];
    updatedCompetencies.splice(index, 1);
    setCompetencyForm({ competencies: updatedCompetencies });
  };

  const handleSubmit = () => {
    handleToggle();
    sessionStorage.setItem("competencyForm", JSON.stringify(competencyForm));
  };

  return (
    <div className="competency">
      {isActivecongrats && (
        <div className="modal-wrap">
          <div className="modal-content text-center">
            <div className="close-icon-competency" onClick={handleToggle}>
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
              {competencyForm.competencies.map(
                (competency: any, index: any) => (
                  <div key={index}>
                    <div className="flex-container">
                      <div>
                        <label className="label-style">Degree Name</label>
                        <input
                          type="text"
                          placeholder="Degree Name"
                          value={competency.courseName}
                          onChange={(e) =>
                            handleChange(index, "courseName", e.target.value)
                          }
                          className="input-style-competency "
                        />
                      </div>
                      <div>
                        <label className="label-style">
                          Upload Certificate
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
                    <div>
                      {competencyForm.competencies.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCompetency(index)}
                          className="remove-button"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                )
              )}
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
          <a href="/information/personal-info">&lt; Previous</a>
          <a href="/information/work-history">Next &gt;</a>
        </div>
      </div>
    </div>
  );
};

export default CompetencyComponent;
