import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "./others/apiUtils";
import { useAuth } from "./AuthContext";
import { geocodeAddress } from "./others/Api";
import CreatePost from "./CreatePost";
import "./PostingStyles.css";

function AllPostings() {
  const { user } = useAuth();
  const [userId] = useState(user?.user_id || -1);
  const [postings, setPostings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostings();
  }, []);

  const fetchPostings = async () => {
    try {
      const response = await fetch(`/api/postings`);
      errorHandler(response);
      const data = await response.json();
      // Iterate through each posting and fetch geocode data
      const postingsWithGeocode = await Promise.all(
        data.Postings.map(async (posting) => {
          const geocodeData = await geocodeAddress(posting.post_address);
          return { ...posting, geocodeData };
        })
      );
      setPostings(postingsWithGeocode);
    } catch (error) {
      console.error("Error fetching postings:", error);
    }
  };

  const handlePostingClick = (id) => {
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
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginLeft: "10px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            key={posting.post_id}
            onClick={() => handlePostingClick(posting.post_id)}
          >
            <h3>{posting.post_title}</h3>
            <p>{posting.post_description}</p>
            {posting.geocodeData && (
              <div>
                <h4>Geocode Data:</h4>
                <p>Latitude: {posting.geocodeData.latitude}</p>
                <p>Longitude: {posting.geocodeData.longitude}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AllPostings;
