import "./PersonalInfo.scss";

import React, { FC, useEffect, useState } from "react";

import ProfileCard from "../ProfileCard/ProfileCard";
import Wizard from "../Wizard/Wizard";
import { updateGameAction } from "@stagetheproindia/react-progamification";

interface PersonalInfoForm {
	fullName: string;
	bloodGroup: string;
	contactAddress: string;
	dateOfBirth: string;
	personalEmail: string;
	state: string;
	fatherName: string;
	personalMobileNumber: string;
	pincode: string;
}
const PersonalInfo: FC = () => {
	const [isActivecongrats, setisActivecongrats] = useState(false);
	const [isActiveIntroCard, setisActiveIntroCard] = useState(true);
	const [updatedPoints, setPoints] = useState<number>();
	const [personalInfoForm, setPersonalInfoForm] = useState<PersonalInfoForm>(
		() => {
			const storedData = sessionStorage.getItem("personalInfoForm");
			return storedData
				? JSON.parse(storedData)
				: {
						fullName: "",
						bloodGroup: "",
						contactAddress: "",
						dateOfBirth: "",
						personalEmail: "",
						state: "",
						fatherName: "",
						personalMobileNumber: "",
						pincode: "",
				  };
		}
	);

	useEffect(() => {
		const hasAllValues = sessionStorage.getItem("personalInfoForm");
		if (hasAllValues) {
			setisActiveIntroCard(false);
		}
	}, [personalInfoForm]);

	const handleChange = (field: keyof PersonalInfoForm, value: string) => {
		setPersonalInfoForm((prevForm) => ({
			...prevForm,
			[field]: value,
		}));
	};
	const triggerGameAction = async () => {
		const res = await updateGameAction(
			"b171b656-039d-4243-bfe7-1c8c9af6665c",
			"659645cdf65b39eb5e13596f",
			"",
			""
		);

		setPoints(res.data.points);
		handleToggleIsCongrats();
	};
	const handleSubmit = async () => {
		await triggerGameAction();

		sessionStorage.setItem(
			"personalInfoForm",
			JSON.stringify(personalInfoForm)
		);
	};
	const handleToggleIsCongrats = () => {
		setisActivecongrats(!isActivecongrats);
	};
	const handleToggleIsIntro = () => {
		setisActiveIntroCard(!isActiveIntroCard);
	};

	return (
		<div className="personal-info">
			{isActiveIntroCard && (
				<div className="modal-wrap">
					<div className="modal-content text-center">
						<div className="congrats-title">Help us know you better!</div>
						<div className="congrats-description">
							Complete onboarding process within 2 days and earn
							<span className="reward-points"> 50 points </span>
							for each step!
						</div>
						<div className="submit-container">
							<button
								type="button"
								onClick={handleToggleIsIntro}
								className="submit-button"
							>
								Start
							</button>
						</div>
					</div>
				</div>
			)}
			{isActivecongrats && (
				<div className="modal-wrap">
					<div className="modal-content">
						<div
							onClick={handleToggleIsCongrats}
							className="close-icon-competency"
						>
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
			<ProfileCard />
			<div className="form-container main-container">
				<Wizard />
				<form>
					<div>
						<div className="flex-container-profile-info">
							<div>
								<label className="label-style-personal-info">Full Name</label>
								<input
									type="text"
									placeholder="Full Name"
									value={personalInfoForm.fullName}
									onChange={(e) => handleChange("fullName", e.target.value)}
									className="input-style-personal-info"
								/>
							</div>
							<div>
								<label className="label-style-personal-info">Blood Group</label>
								<select
									value={personalInfoForm.bloodGroup}
									onChange={(e) => handleChange("bloodGroup", e.target.value)}
									className="input-personal-info"
								>
									<option value="" disabled selected>
										Select
									</option>
									<option value="A+">A+</option>
									<option value="A-">A-</option>
									<option value="B+">B+</option>
									<option value="B-">B-</option>
									<option value="AB+">AB+</option>
									<option value="AB-">AB-</option>
									<option value="O+">O+</option>
									<option value="O-">O-</option>
								</select>
							</div>
							<div>
								<label className="label-style-personal-info">
									Contact Address
								</label>
								<input
									type="text"
									placeholder="Contact Address"
									value={personalInfoForm.contactAddress}
									onChange={(e) =>
										handleChange("contactAddress", e.target.value)
									}
									className="input-style-personal-info"
								/>
							</div>
						</div>
						<div className="flex-container-profile-info">
							<div>
								<label className="label-style-personal-info">
									Date of Birth
								</label>
								<input
									type="date"
									value={personalInfoForm.dateOfBirth}
									onChange={(e) => handleChange("dateOfBirth", e.target.value)}
									className="input-style-personal-info"
								/>
							</div>
							<div>
								<label className="label-style-personal-info">
									Personal Email
								</label>
								<input
									type="text"
									placeholder="Personal Email"
									value={personalInfoForm.personalEmail}
									onChange={(e) =>
										handleChange("personalEmail", e.target.value)
									}
									className="input-style-personal-info"
								/>
							</div>
							<div>
								<label className="label-style-personal-info">State</label>
								<select
									value={personalInfoForm.state}
									onChange={(e) => handleChange("state", e.target.value)}
									className="input-personal-info"
								>
									<option value="" disabled selected>
										Select
									</option>
									<option value="Andhra Pradesh">Andhra Pradesh</option>
									<option value="Arunachal Pradesh">Arunachal Pradesh</option>
									<option value="Assam">Assam</option>
									<option value="Bihar">Bihar</option>
									<option value="Chhattisgarh">Chhattisgarh</option>
									<option value="Goa">Goa</option>
									<option value="Gujarat">Gujarat</option>
									<option value="Haryana">Haryana</option>
									<option value="Himachal Pradesh">Himachal Pradesh</option>
									<option value="Jharkhand">Jharkhand</option>
									<option value="Karnataka">Karnataka</option>
									<option value="Kerala">Kerala</option>
									<option value="Madhya Pradesh">Madhya Pradesh</option>
									<option value="Maharashtra">Maharashtra</option>
									<option value="Manipur">Manipur</option>
									<option value="Meghalaya">Meghalaya</option>
									<option value="Mizoram">Mizoram</option>
									<option value="Nagaland">Nagaland</option>
									<option value="Odisha">Odisha</option>
									<option value="Punjab">Punjab</option>
									<option value="Rajasthan">Rajasthan</option>
									<option value="Sikkim">Sikkim</option>
									<option value="Tamil Nadu">Tamil Nadu</option>
									<option value="Telangana">Telangana</option>
									<option value="Tripura">Tripura</option>
									<option value="Uttar Pradesh">Uttar Pradesh</option>
									<option value="Uttarakhand">Uttarakhand</option>
									<option value="West Bengal">West Bengal</option>
									<option value="Andaman and Nicobar Islands">
										Andaman and Nicobar Islands
									</option>
									<option value="Chandigarh">Chandigarh</option>
									<option value="Daman and Diu">Daman and Diu</option>
									<option value="Lakshadweep">Lakshadweep</option>
									<option value="Delhi">Delhi</option>
									<option value="Puducherry">Puducherry</option>
									<option value="Jammu and Kashmir">Jammu and Kashmir</option>
									<option value="Ladakh">Ladakh</option>
								</select>
							</div>
						</div>
						<div className="flex-container-profile-info">
							<div>
								<label className="label-style-personal-info">Father Name</label>
								<input
									type="text"
									placeholder="Father Name"
									value={personalInfoForm.fatherName}
									onChange={(e) => handleChange("fatherName", e.target.value)}
									className="input-style-personal-info"
								/>
							</div>
							<div>
								<label className="label-style-personal-info">
									Personal Mobile Number
								</label>
								<input
									type="text"
									placeholder="Personal Mobile Number"
									value={personalInfoForm.personalMobileNumber}
									onChange={(e) =>
										handleChange("personalMobileNumber", e.target.value)
									}
									className="input-style-personal-info"
								/>
							</div>
							<div>
								<label className="label-style-personal-info">Pincode</label>
								<input
									type="text"
									placeholder="Pincode"
									value={personalInfoForm.pincode}
									onChange={(e) => handleChange("pincode", e.target.value)}
									className="input-style-personal-info"
								/>
							</div>
						</div>
					</div>
					<div className="submit-container">
						<button
							type="button"
							onClick={handleSubmit}
							className="submit-button"
						>
							Submit
						</button>
					</div>
				</form>
				<div className="navigate-actions">
					<a className="disabled-link">&lt; Previous</a>
					<a href="/information/competency">Next &gt;</a>
				</div>
			</div>
		</div>
	);
};

export default PersonalInfo;
