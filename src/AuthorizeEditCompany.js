import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import EditCompany from "./EditCompany";
import CreateCompany from "./CreateCompany";
import "./styles.css";

function AuthorizeEditCompany() {
  const { user } = useAuth();

  // Check if User is NOT a Poster
  if (user.user_type !== "poster") {
    return (
      <div className="company-block">
        <p>
          You do not have the necessary permissions to edit or configure Company
          pages.
        </p>
      </div>
    );
  }

  // Check if User is a Poster that is not affiliated with a Company
  if (user.cm_id === 1 || user.cm_id === null) {
    return (
      <div className="company-block">
        <CreateCompany />
      </div>
    );
  }

  // User is a Poster and is associated with a Company
  return (
    <div className="company-block">
      <EditCompany cm_id={user.cm_id} />
    </div>
  );
}

export default AuthorizeEditCompany;
