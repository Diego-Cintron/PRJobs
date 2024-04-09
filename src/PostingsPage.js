import React from "react";
import AllPostings from "./AllPostings";
import UserProfile from "./UserProfile";
import Company from "./Company";

function PostingsPage() {
  return (
    <div>
      <div className="container">
        <UserProfile />
        <AllPostings />
        <Company />
      </div>
    </div>
  );
}

export default PostingsPage;
