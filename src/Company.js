import React from "react";
// import { errorHandle } from './apiUtils';
import "./styles.css";

const Company = () => {
  return (
    <div className="company-block">
      <img src="\src\images\meson-lugar.jpeg" height={250} width={400}></img>
      <img
        className="company-logo-picture"
        src="\src\images\el-meson-logo.png"
        height={70}
        width={100}
      ></img>
      <p className="company-description">Company Name & Description</p>
      <p className="map">Map</p>
      <p className="joblistings">Job Listings</p>
      <p className="positions">Positions (bullet points)</p>
      <p className="availability">Availability (bullet points)</p>
    </div>
  );
};
export default Company;
