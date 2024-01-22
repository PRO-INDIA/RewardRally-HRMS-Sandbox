import "./WorkHistroy.scss";

import { FC, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import ProfileCard from "../ProfileCard/ProfileCard";
import React from "react";
import Wizard from "../Wizard/Wizard";
import { environment } from "../../Environments/Environment";
import { updateGameAction } from "@stagetheproindia/react-progamification";

interface WorkHistory {
	companyName: string;
	durationFrom: string;
	durationTo: string;
	certificate: string;
}

interface WorkHistroyForm {
	workHistories: WorkHistory[];
}

const WorkHistroy: FC = () => {
	const [isActivecongrats, setisActivecongrats] = useState(false);
	const [updatedPoints, setPoints] = useState<number>(0);

	const {
		control,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<WorkHistroyForm>({
		defaultValues: {
			workHistories: [
				{ companyName: "", durationFrom: "", durationTo: "", certificate: "" },
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "workHistories",
	});

	const triggerGameAction = async () => {
		const res = await updateGameAction(
			environment.gamification.userId,
			environment.gamification.workHistorySubmissionAction,
			"",
			""
		);

		setPoints(res.data.data.points);
		handleToggle();
	};

	const handleToggle = () => {
		setisActivecongrats(!isActivecongrats);
	};

	const handleChange = (
		index: number,
		field: keyof WorkHistory,
		value: string
	) => {
		setValue(`workHistories.${index}.${field}`, value);
	};

	const addWorkHistory = () => {
		append({
			companyName: "",
			durationFrom: "",
			durationTo: "",
			certificate: "",
		});
	};

	const removeWorkHistory = (index: number) => {
		remove(index);
	};

	const onSubmit: SubmitHandler<WorkHistroyForm> = (data) => {
		triggerGameAction();
		sessionStorage.setItem("workHistroyForm", JSON.stringify(data));
	};

	return (
		<div className="competency">
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
              You have successfully completed the final step of user profile and
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
							{fields.map((workHistory: WorkHistory, index: number) => (
								<div key={index}>
									<div className="flexcontainer">
										<div>
											<label className="label-style">Company Name</label>
											<input
												type="text"
												placeholder="Company Name"
												{...register(`workHistories.${index}.companyName`, {
													required: "This field is required",
												})}
												className="input-style-competency"
											/>
											{errors?.workHistories?.[index]?.companyName && (
												<p className="error-message">
													{errors.workHistories[index]?.companyName?.message ||
														""}
												</p>
											)}
										</div>
										<div>
											<label className="label-style">
												Relieving Certificate
											</label>
											<input
												type="file"
												id={`certificate${index}`}
												{...register(`workHistories.${index}.certificate`)}
												className="input-style-competency"
											/>

										</div>
									</div>
									<div className="flexcontainer">
										<div>
											<label className="label-style">Duration From</label>
											<input
												type="date"
												{...register(`workHistories.${index}.durationFrom`, {
													required: "This field is required",
												})}
												className="input-style-competency"
											/>
											{errors?.workHistories?.[index]?.durationFrom && (
												<p className="error-message">
													{errors.workHistories[index]?.durationFrom?.message ||
														""}
												</p>
											)}
										</div>
										<div>
											<label className="label-style">Duration To</label>
											<input
												type="date"
												{...register(`workHistories.${index}.durationTo`, {
													required: "This field is required",
												})}
												className="input-style-competency"
											/>
											{errors?.workHistories?.[index]?.durationTo && (
												<p className="error-message">
													{errors.workHistories[index]?.durationTo?.message ||
														""}
												</p>
											)}
										</div>
									</div>
									<div>
										{fields.length > 1 && (
											<button
												type="button"
												onClick={() => removeWorkHistory(index)}
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
					<button type="button" onClick={addWorkHistory} className="add-button">
						+ Add
					</button>
					<div className="submit-container">
						<button type="submit" className="submit-button">
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
