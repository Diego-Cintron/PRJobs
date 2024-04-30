import React, { useState, useEffect } from "react";
import { errorHandler } from "./others/apiUtils";
import "./styles.css";

const Company = ({ companyId }) => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch(`/api/companies/${companyId}`);
        errorHandler(response);
        const data = await response.json();
        setCompany(data.Company);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [companyId]);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="company-block">
      <img
        src={
          company.cm_logo ||
          "https://thumbs.dreamstime.com/b/beige-tan-generic-open-office-work-space-cubicals-1932837.jpg"
        }
        height={250}
        width={400}
      ></img>
      <p>Name: {company.cm_name}</p>
      <p className="company-description">
        Description: {company.cm_description}
      </p>
      <p>Phone: {company.cm_phone}</p>
      <p>Email: {company.cm_email}</p>
    </div>
  );
};

export default Company;
