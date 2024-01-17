import "./TimeSheet.scss";

import React, { FC, useEffect, useState } from "react";

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
	const [updatedPoints, setPoints] = useState<number>(0);
	const triggerGameAction = async () => {
		const res = await updateGameAction(
			"b171b656-039d-4243-bfe7-1c8c9af6665c",
			"659645cdf65b39eb5e13596f",
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
		triggerGameAction();
		console.log(timesheetForm, "timesheetForm");
	};

	return (
		<div className="timesheet">
			<div className="timesheet-container">
				<div className="header">
					<div className="timesheet-header py-3">Time Sheet - Weekly</div>
					<div className="navigate-actions-timesheet">
						<div className="title-timesheet py-3">
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
