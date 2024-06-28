import "./PersonalInfo.scss";

import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import ProfileCard from "../ProfileCard/ProfileCard";
import React from "react";
import Wizard from "../Wizard/Wizard";
import { environment } from "../../Environments/Environment";
import { updateGameAction } from "@theproindia/react-rewardrally";
import { useNavigate } from "react-router-dom";

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
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<PersonalInfoForm>();
	const navigate = useNavigate();
	const [isActiveCongrats, setisActiveCongrats] = useState(false);
	const [isActiveIntroCard, setisActiveIntroCard] = useState(true);
	const [updatedPoints, setPoints] = useState<number>(0);

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
		setValue(field, value);
	};

	const triggerGameAction = async () => {
		const res = await updateGameAction(
			environment.gamification.userId,
			environment.gamification.profileSubmissionAction,
			"",
			""
		);

		setPoints(res.data.data.points);

		handleToggleIsCongrats();
	};

	const handleSubmitForm: SubmitHandler<PersonalInfoForm> = async (data) => {
		await triggerGameAction();
		sessionStorage.setItem("personalInfoForm", JSON.stringify(data));
	};

	const handleToggleIsCongrats = () => {
		setisActiveCongrats(!isActiveCongrats);
	};

	const handleToggleIsIntro = () => {
		setisActiveIntroCard(!isActiveIntroCard);
	};

	return (
		<div className="personal-info">
			{isActiveIntroCard && (
				<div className="modal-wrap">
					<div className="modalcontent text-center">
						<div className="congrats-title">Help us know you better!</div>
						<div className="congrats-description">
							Finish the onboarding process and accumulate
							<span className="reward-points"> points </span>
							for each completed step!
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
			{isActiveCongrats && (
				<div className="modal-wrap">
					<div className="modalcontent">
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
							You have successfully completed the first step for user profile
							and earned
							<span className="reward-points"> {updatedPoints} </span>
							Points
						</div>
					</div>
				</div>
			)}
			<ProfileCard />
			<div className="form-container main-container">
				<Wizard />
				<form onSubmit={handleSubmit(handleSubmitForm)}>
					<div>
						<div className="flex-container-profile-info">
							<div>
								<label className="label-style-personal-info">Full Name</label>
								<input
									type="text"
									placeholder="Full Name"
									defaultValue={personalInfoForm.fullName}
									{...register("fullName", {
										required: "Name is required",
									})}
									onBlur={(e) => handleChange("fullName", e.target.value)}
									className="input-style-personal-info"
								/>
								{errors.fullName && (
									<p className="error-message">{errors.fullName.message}</p>
								)}
							</div>
							<div>
								<label className="label-style-personal-info">Blood Group</label>
								<select
									defaultValue={personalInfoForm.bloodGroup}
									{...register("bloodGroup", {
										required: "Blood group is required",
									})}
									onBlur={(e) => handleChange("bloodGroup", e.target.value)}
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
								{errors.bloodGroup && (
									<p className="error-message">{errors.bloodGroup.message}</p>
								)}
							</div>
							<div>
								<label className="label-style-personal-info">
									Contact Address
								</label>
								<input
									type="text"
									placeholder="Contact Address"
									defaultValue={personalInfoForm.contactAddress}
									{...register("contactAddress", {
										required: "Address is required",
									})}
									onBlur={(e) => handleChange("contactAddress", e.target.value)}
									className="input-style-personal-info"
								/>
								{errors.contactAddress && (
									<p className="error-message">
										{errors.contactAddress.message}
									</p>
								)}
							</div>
						</div>
						<div className="flex-container-profile-info">
							<div>
								<label className="label-style-personal-info">
									Date of Birth
								</label>
								<input
									type="date"
									defaultValue={personalInfoForm.dateOfBirth}
									{...register("dateOfBirth", {
										required: "DOB is rquired",
									})}
									onBlur={(e) => handleChange("dateOfBirth", e.target.value)}
									className="input-style-personal-info"
								/>
								{errors.dateOfBirth && (
									<p className="error-message">{errors.dateOfBirth.message}</p>
								)}
							</div>
							<div>
								<label className="label-style-personal-info">
									Personal Email
								</label>
								<input
									type="text"
									placeholder="Personal Email"
									defaultValue={personalInfoForm.personalEmail}
									{...register("personalEmail", {
										required: "Personal email is required",
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
											message: "Invalid email address",
										},
									})}
									onBlur={(e) => handleChange("personalEmail", e.target.value)}
									className="input-style-personal-info"
								/>
								{errors.personalEmail && (
									<p className="error-message">
										{errors.personalEmail.message}
									</p>
								)}
							</div>
							<div>
								<label className="label-style-personal-info">State</label>
								<select
									defaultValue={personalInfoForm.state}
									{...register("state", {
										required: "State is required",
									})}
									className="input-personal-info"
									onBlur={(e) => handleChange("state", e.target.value)}
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
								{errors.state && (
									<p className="error-message">{errors.state.message}</p>
								)}
							</div>
						</div>
						<div className="flex-container-profile-info">
							<div>
								<label className="label-style-personal-info">Father Name</label>
								<input
									type="text"
									placeholder="Father Name"
									defaultValue={personalInfoForm.fatherName}
									{...register("fatherName", {
										required: "Father's name is required",
									})}
									onBlur={(e) => handleChange("fatherName", e.target.value)}
									className="input-style-personal-info"
								/>
								{errors.fatherName && (
									<p className="error-message">{errors.fatherName.message}</p>
								)}
							</div>
							<div>
								<label className="label-style-personal-info">
									Personal Mobile Number
								</label>
								<input
									type="text"
									placeholder="Personal Mobile Number"
									defaultValue={personalInfoForm.personalMobileNumber}
									{...register("personalMobileNumber", {
										required: "Phone number is required",
										pattern: {
											value: /^[0-9]{10}$/,
											message: "Invalid mobile number",
										},
									})}
									onBlur={(e) =>
										handleChange("personalMobileNumber", e.target.value)
									}
									className="input-style-personal-info"
								/>
								{errors.personalMobileNumber && (
									<p className="error-message">
										{errors.personalMobileNumber.message}
									</p>
								)}
							</div>
							<div>
								<label className="label-style-personal-info">Pincode</label>
								<input
									type="text"
									placeholder="Pincode"
									defaultValue={personalInfoForm.pincode}
									{...register("pincode", {
										required: "Pincode is required",
										pattern: {
											value: /^[1-9][0-9]{5}$/,
											message: "Invalid pincode",
										},
									})}
									onBlur={(e) => handleChange("pincode", e.target.value)}
									className="input-style-personal-info"
								/>
								{errors.pincode && (
									<p className="error-message">{errors.pincode.message}</p>
								)}
							</div>
						</div>
					</div>
					<div className="submit-container">
						<button type="submit" className="submit-button">
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
