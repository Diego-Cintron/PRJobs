import { useEffect, useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { errorHandler } from "./apiUtils";
import { useAuth } from "./AuthContext";
import CreatePost from "./CreatePost";
import "./PostingStyles.css";

function AllPostings() {
  const { user } = useAuth();
  const [userId] = useState<number>(user?.user_id || -1); // Gets user id dynamically
  const [postings, setPostings] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchPostings();
  }, []);

  const fetchPostings = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/postings/user/${userId}`
      );
      errorHandler(response); // Check response status
      const data = await response.json();
      setPostings(data.Postings);
    } catch (error) {
      console.error("Error fetching postings:", error);
    }
  };

  // Redirect to individual posting page
  const handlePostingClick = (id: number) => {
    navigate(`/postings/${id}`);
  };

  return (
    <div>
      <CreatePost />
      <h1>All Postings</h1>
      {postings.length === 0 ? (
        <p>No Postings Found.</p>
      ) : (
        postings.map((posting) => (
          <div
            key={posting.post_id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginLeft: "10px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            onClick={() => handlePostingClick(posting.post_id)}
          >
            <h3>{posting.post_title}</h3>
            <p>{posting.post_description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AllPostings;
