import React from "react";
import { useAuth } from "./AuthContext";
import "./styles.css";
import { defaultUserImage } from "./others/apiUtils";

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="user-block">
        <p>No user data available.</p>
      </div>
    );
  }

  // Format skills
  const formattedSkills = user.user_skills ? user.user_skills.join(", ") : "No skills found.";

  return (
    <div className="user-block">
      
      <p className="profilename">
        {user.user_fname} {user.user_lname}
      </p>
      <p className="profilename">{user.user_email}</p>
      <p className="skill">{formattedSkills}</p>
      <p className="map">{user.user_address}</p>
    </div>
  );
};

export default UserProfile;
