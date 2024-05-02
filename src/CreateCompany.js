import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "./others/apiUtils";
import { useAuth } from "./AuthContext";
import "./CreateCompanyStyling.css";

function CreateCompany() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState({
    cm_name: "",
    cm_email: "",
    cm_description: "",
    cm_phone: "",
    cm_logo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`/api/companies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
      });
      errorHandler(response);
      const data = await response.json();
  
      setCompanyData(data.Company);
  
      alert("Company profile created successfully.");
      updateUserData(data.Company.cm_id); 
    } catch (error) {
      console.error("Error creating company profile:", error);
      alert("Error creating company profile.");
    }
  };  

  const updateUserData = async (cm_id) => {
    try {
      const updatedUserData = { ...user, cm_id: cm_id };
      const { user_id, ...dataToSend } = updatedUserData;
      const response = await fetch(`/api/users/${user.user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      errorHandler(response);
      updateUser({ cm_id: cm_id }); // Update currently signed in data
      navigate(`/postings`);
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Error updating user data.");
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="create-block">
      
      <div className="format-create">
      <h2>Create a Company Profile</h2>
      <p className="divider"></p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cm_name">Company Name:</label>
          <input style={{textAlign: "center"}}
            type="text" 
            placeholder="Please enter the name of your company."
            id="cm_name"
            name="cm_name"
            value={companyData.cm_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cm_email">Email:</label>
          <input style={{textAlign: "center"}}
            type="email"
            placeholder="Enter a valid email through which job searchers may contact you."
            id="cm_email"
            name="cm_email"
            value={companyData.cm_email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cm_description">Description:</label>
          <textarea style={{textAlign: "center"}}
            id="cm_description"
            placeholder="Please enter a company description."
            name="cm_description"
            value={companyData.cm_description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cm_phone">Phone:</label>
          <input style={{textAlign: "center"}}
            type="text"
            placeholder="ex. 787-123-4556"
            id="cm_phone"
            name="cm_phone"
            value={companyData.cm_phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cm_logo">Logo URL:</label>
          <input style={{textAlign: "center"}}
            type="text"
            placeholder="Enter the image URL of your company logo."
            id="cm_logo"
            name="cm_logo"
            value={companyData.cm_logo}
            onChange={handleInputChange}
            required
          />
        </div>

        <p className="divider"></p>
        <div>
          <button type="submit">Create Company</button>
        </div>
      </form>
      </div>

    </div>
  );
}

export default CreateCompany;
