import React from "react";
import "./styles.css";

const UserProfile = () => {
  return (
    <div className="user-block">
      <img src="\src\images\Male Avatar.jpg" height={100} width={100} alt="User Avatar" />
      <p className="profilename">Name LastName</p>
      <p className="description">Description</p>
      <p className="email">Email</p>
      <p className="skill">Skills #add bullet points function</p>
      <p className="map">Map</p>
    </div>
  );
};

export default UserProfile;
