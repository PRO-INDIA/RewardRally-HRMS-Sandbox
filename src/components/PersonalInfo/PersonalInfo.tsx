import React, { FC, useState } from "react";
import "./PersonalInfo.scss";
import Wizard from "../Wizard/Wizard";
import ProfileCard from "../ProfileCard/ProfileCard";

interface PersonalInfoProps {}

const PersonalInfo: FC<PersonalInfoProps> = () => {
  const [personalInfoForm, setPersonalInfoForm] = useState({
    fullName: "",
    bloodGroup: "",
    contactAddress: "",
    dateOfBirth: "",
    personalEmail: "",
    state: "",
    fatherName: "",
    personalMobileNumber: "",
    pincode: "",
  });

  const handleChange = (field: string, value: string) => {
    setPersonalInfoForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(personalInfoForm);
  };

  return (
    <div className="personal-info">
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
