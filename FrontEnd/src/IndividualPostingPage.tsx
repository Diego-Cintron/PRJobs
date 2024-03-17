import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { errorHandle } from "./apiUtils";

const IndividualPostingPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // Note the '?' to indicate optional parameter
  const [posting, setPosting] = useState<any>(null);

  // Fetch data whenever ID changes
  useEffect(() => {
    if (!id) {
      return; // Return early if id is undefined
    }

    // Fetch data for the specific posting using the ID
    fetchPosting(id);
  }, [id]);

  const fetchPosting = async (postId: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/postings/${postId}`);
      errorHandle(response); // Check response status
      const data = await response.json();
      setPosting(data.Posting);
    } catch (error) {
      console.error("Error fetching posting:", error);
    }
  };

  // Render loading indicator while data is being fetched
  if (!posting) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Individual Posting</h2>
      <h3>Title: {posting.post_title}</h3>
      <p>Description: {posting.post_description}</p>
      <p>Date Submmited: {posting.post_uploaded}</p>
    </div>
  );
};

export default IndividualPostingPage;
