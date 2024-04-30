import React, { useState } from "react";
import { errorHandler } from "./others/apiUtils";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SignUpStyle.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_fname: "",
    user_lname: "",
    user_email: "",
    user_password: "",
    user_type: "",
    user_phone: "",
    user_birthday: null,
    user_available: [false, false, false, false, false, false, false],
    user_skills: [],
    cm_id: 1,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        user_available: prevState.user_available.map((_, index) =>
          index === parseInt(name) ? checked : prevState.user_available[index]
        ),
      }));
    } else if (name === "user_skills") {
      const skillsArray = value.split(",").map((skill) => skill.trim());
      setFormData((prevState) => ({
        ...prevState,
        user_skills: skillsArray,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      user_birthday: date ? date.toISOString().split("T")[0] : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      errorHandler(response);
      alert("Account Creation Successful. Please Sign In.");
      navigate(`/`);
    } catch (error) {
      alert("Error creating account.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="background">
        <div />

        <img
          className="logo"
          src={
            "https://drive.google.com/thumbnail?id=1gDZsJIvwVTYlHBFyqVPtAZSwMhnwx7Mp"
          }
          height={200}
          width={200}
          alt="PRJobs logo"
        />

      <p className="SignUp-title">
        Create a new account
      </p>
      <p className="divider"></p>
      <p className="block"></p>

      <div className="fullName">
      <div className="FName"> 
        <label htmlFor="user_fname">First Name:</label>
        <input style={{textAlign: "center"}}
          type="text"
          placeholder="First Name"
          id="user_fname"
          name="user_fname"
          value={formData.user_fname}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="LName">
        <label htmlFor="user_lname">Last Name:</label>
        <input style={{textAlign: "center"}}
          type="text"
          placeholder="Last Name"
          id="user_lname"
          name="user_lname"
          value={formData.user_lname}
          onChange={handleInputChange}
          required
        />
      </div>
      </div>

      <div className="Email">
        <label htmlFor="user_email">Email Address:</label>
        <input style={{textAlign: "center"}}
          type="text"
          placeholder="example@example.com"
          id="user_email"
          name="user_email"
          value={formData.user_email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="Password">
        <label htmlFor="user_password">Create Password:</label>
        <input style={{textAlign: "center"}}
          type="text"
          placeholder="Please enter your new password."
          id="user_password"
          name="user_password"
          value={formData.user_password}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="addBlock">
      <div className="Address">
        <label htmlFor="user_address">Address:</label>
        <input style={{textAlign: "center"}}
          type="text"
          placeholder="Please enter your home address."
          id="user_address"
          name="user_address"
          value={formData.user_address}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="Municipality">
        <label htmlFor="user_municipality">Municipality:</label>
        <input style={{textAlign: "center"}}
          type="text"
          placeholder="ex. Bayamon"
          id="user_municipality"
          name="user_municipality"
          value={formData.user_municipality}
          onChange={handleInputChange}
          required
        />
      </div>
      </div>

      <div className="Phone">
        <label htmlFor="user_phone">Phone:</label>
        <input style={{textAlign: "center"}}
          type="text"
          placeholder="Please enter a mobile number."
          id="user_phone"
          name="user_phone"
          value={formData.user_phone}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="ProfilePicture">
        <label htmlFor="user_image">Profile Picture:</label>
        <input style={{textAlign: "center"}}
          type="text"
          placeholder="Enter image URL."
          id="user_image"
          name="user_image"
          value={formData.user_image}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="Skills">
        <label htmlFor="user_skills">Skills:</label>
        <input style={{textAlign: "center"}}
          type="text"
          id="user_skills"
          name="user_skills"
          value={formData.user_skills.join(", ")}
          onChange={handleInputChange}
          placeholder="Enter your skills, separated by commas. Ex. python, frontend, excel "
        />
      </div>

        <div className="Birthday">
          <label htmlFor="user_birthday">Birthday: </label>
          <DatePicker
            id="user_birthday"
            name="user_birthday"
            selected={
              formData.user_birthday ? new Date(formData.user_birthday) : null
            }
            onChange={(date) => handleDateChange(date)}
            dateFormat="yyyy-MM-dd"
            required
          />
        </div>

        <div className="UsrType">
          <label htmlFor="user_type">User Type: </label>
          <select
            id="user_type"
            name="user_type"
            value={formData.user_type}
            onChange={handleInputChange}
            required
          >
            <option value="">Select User Type</option>
            <option value="searcher">Searcher</option>
            <option value="poster">Poster</option>
          </select>
        </div>

      <div className="Availability" style={{display: "flex"}}>
        <p style={{margin: 10}} >User Availability: </p>
        <label>
          <input
            type="checkbox"
            name="0"
            checked={formData.user_available[0]}
            onChange={handleInputChange}
          />
          Sunday
        </label>
        <label>
          <input
            type="checkbox"
            name="1"
            checked={formData.user_available[1]}
            onChange={handleInputChange}
          />
          Monday
        </label>
        <label>
          <input
            type="checkbox"
            name="2"
            checked={formData.user_available[2]}
            onChange={handleInputChange}
          />
          Tuesday
        </label>
        <label>
          <input
            type="checkbox"
            name="3"
            checked={formData.user_available[3]}
            onChange={handleInputChange}
          />
          Wednesday
        </label>
        <label>
          <input
            type="checkbox"
            name="4"
            checked={formData.user_available[4]}
            onChange={handleInputChange}
          />
          Thursday
        </label>
        <label>
          <input
            type="checkbox"
            name="5"
            checked={formData.user_available[5]}
            onChange={handleInputChange}
          />
          Friday
        </label>
        <label>
          <input
            type="checkbox"
            name="6"
            checked={formData.user_available[6]}
            onChange={handleInputChange}
          />
          Saturday
        </label>
      </div>
      
      <button class="submit">Sign Up</button>
      
      </div>
    </form>
  );
};

export default SignUp;
