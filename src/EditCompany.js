import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { errorHandler } from "./others/apiUtils";
import { useAuth } from "./AuthContext";
import "./EditCompanyStyling.css";

const EditCompany = ({ cm_id }) => {
  const { user } = useAuth();
  const [companyData, setCompanyData] = useState({
    cm_name: "",
    cm_email: "",
    cm_description: "",
    cm_phone: "",
    cm_logo: "",
  });

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const response = await fetch(`/api/companies/${cm_id}`);
      errorHandler(response);
      const data = await response.json();
      setCompanyData(data.Company);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/companies/${cm_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
      });
      errorHandler(response);
      alert("Company details updated successfully.");
    } catch (error) {
      console.error("Error updating company details:", error);
      alert("Error updating company details.");
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
    <div className="edit-block">

      <div className="format">
      <h2>Edit Company</h2>
      <p className="divider"></p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cm_name">Company Name:</label>
          <input style={{textAlign: "center", color: "gray"}}
            type="text"
            id="cm_name"
            name="cm_name"
            value={companyData.cm_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cm_email">Email:</label>
          <input style={{textAlign: "center", color: "gray"}}
            type="email"
            id="cm_email"
            name="cm_email"
            value={companyData.cm_email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cm_description">Description:</label>
          <textarea style={{textAlign: "center", color: "gray"}}
            id="cm_description"
            name="cm_description"
            value={companyData.cm_description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cm_phone">Phone:</label>
          <input style={{textAlign: "center", color: "gray"}}
            type="text"
            id="cm_phone"
            name="cm_phone"
            value={companyData.cm_phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cm_logo">Logo URL:</label>
          <input style={{textAlign: "center", color: "gray"}}
            type="text"
            id="cm_logo"
            name="cm_logo"
            value={companyData.cm_logo}
            onChange={handleInputChange}
            required
          />
        </div>

        <p className="divider"></p>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>

      </div>

    </div>
  );
}

export default EditCompany;
