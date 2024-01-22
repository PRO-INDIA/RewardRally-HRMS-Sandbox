import "./Compentency.scss";

import { FC, useState } from "react";
import {
	FieldValues,
	SubmitHandler,
	useFieldArray,
	useForm,
} from "react-hook-form";

import ProfileCard from "../ProfileCard/ProfileCard";
import React from "react";
import Wizard from "../Wizard/Wizard";
import { environment } from "../../Environments/Environment";
import { updateGameAction } from "@stagetheproindia/react-progamification";

interface Competency {
	courseName: string;
	durationFrom: string;
	durationTo: string;
	certificate: string;
}

interface UpdatedCompetencies {
	competencies: Competency[];
}

const CompetencyComponent: FC = () => {
	const {
		control,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<UpdatedCompetencies>({
		defaultValues: {
			competencies: [
				{ courseName: "", durationFrom: "", durationTo: "", certificate: "" },
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "competencies",
	});

	const [isActivecongrats, setisActivecongrats] = useState(false);
	const [updatedPoints, setPoints] = useState<number>(0);

	const triggerGameAction = async () => {
		const res = await updateGameAction(
			environment.gamification.userId,
			environment.gamification.competancySubmissionAction,
			"",
			""
		);

		setPoints(res.data.data.points);
		handleToggle();
	};

	const handleToggle = () => {
		setisActivecongrats(!isActivecongrats);
	};

	const onSubmit: SubmitHandler<UpdatedCompetencies> = (data) => {
		triggerGameAction();
		sessionStorage.setItem("competencyForm", JSON.stringify(data));
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
              You have successfully completed the second step of user profile and
              earned
              <span className="reward-points"> {updatedPoints} </span>
              Points
            </div>
          </div>
        </div>
      )}
			<ProfileCard />
			<div className="form-container main-container">
				<Wizard />
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<div>
							{fields.map((competency: Competency, index: number) => (
								<div key={index}>
									<div className="flex">
										<div>
											<label className="label-style">Degree Name</label>
											<input
												type="text"
												placeholder="Degree Name"
												{...register(`competencies.${index}.courseName`, {
													required: "This field is required",
												})}
												className="input-style-competency"
											/>
											{errors?.competencies?.[index]?.courseName && (
												<p className="error-message">
													{errors.competencies[index]?.courseName?.message ||
														""}
												</p>
											)}
										</div>
										<div>
											<label className="label-style">Upload Certificate</label>
											<input
												type="file"
												id={`certificate${index}`}
												{...register(`competencies.${index}.certificate`, {
													required: "This field is required",
												})}
												className="input-style-competency"
											/>
											{errors?.competencies?.[index]?.certificate && (
												<p className="error-message">
													{errors.competencies[index]?.certificate?.message ||
														""}
												</p>
											)}
										</div>
									</div>
									<div className="flex">
										<div>
											<label className="label-style">Duration From</label>
											<input
												type="date"
												{...register(`competencies.${index}.durationFrom`, {
													required: "This field is required",
												})}
												className="input-style-competency"
											/>
											{errors?.competencies?.[index]?.durationFrom && (
												<p className="error-message">
													{errors.competencies[index]?.durationFrom?.message ||
														""}
												</p>
											)}
										</div>
										<div>
											<label className="label-style">Duration To</label>
											<input
												type="date"
												{...register(`competencies.${index}.durationTo`, {
													required: "This field is required",
												})}
												className="input-style-competency"
											/>
											{errors?.competencies?.[index]?.durationTo && (
												<p className="error-message">
													{errors.competencies[index]?.durationTo?.message ||
														""}
												</p>
											)}
										</div>
									</div>
									<div>
										{fields.length > 1 && (
											<button
												type="button"
												onClick={() => remove(index)}
												className="remove-button"
											>
												Remove
											</button>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
					<button
						type="button"
						onClick={() =>
							append({
								courseName: "",
								durationFrom: "",
								durationTo: "",
								certificate: "",
							})
						}
						className="add-button"
					>
						+ Add
					</button>
					<div className="submit-container">
						<button type="submit" className="submit-button">
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
