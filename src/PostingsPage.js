import React from "react";
import AllPostings from "./AllPostings";

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
