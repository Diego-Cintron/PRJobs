import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import NavigationBar from "./NavigationBar";
import EditCompany from "./EditCompany";
import CreateCompany from "./CreateCompany";
import "./styles.css";

function AuthorizeEditCompany() {
  const { user } = useAuth();

  // Check if User is NOT a Poster
  if (user.user_type !== "poster") {
    return (
      <div className="background" 
      style={{height: "100%", width: "100%"}}>

        <NavigationBar />
        <div style={{margin: "auto", marginTop: "5%", textAlign: "center",
           backgroundColor: "rgba(238, 238, 238, 0.692)", border: "2px solid #00b8a9", padding: "1%", borderRadius: "25px", 
           marginLeft: "20%", marginRight: "20%"}}>
          <p>
            You do not have the necessary permissions to edit or configure
            Company profiles.
          </p>
        </div>
      </div>
    );
  }

  // Check if User is a Poster that is not affiliated with a Company
  if (user.cm_id === 1 || user.cm_id === null) {
    return (
      <div>
        <NavigationBar />
        <CreateCompany />
      </div>
    );
  }

  // User is a Poster and is associated with a Company
  return (
    <div>
      <NavigationBar />
      <EditCompany cm_id={user.cm_id} />;
    </div>
  );
}

export default AuthorizeEditCompany;
