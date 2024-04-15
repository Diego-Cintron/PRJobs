import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "./others/apiUtils";
import { useAuth } from "./AuthContext";
import { geocodeAddress } from "./others/Api";
import CreatePost from "./CreatePost";
import { calculateDistance } from "./others/Haversine"; // Import the calculateDistance function
import "./PostingStyles.css";

function AllPostings() {
  const { user } = useAuth();
  const [userId] = useState(user?.user_id || -1);
  const [userLatitude, setUserLatitude] = useState(null); // State to hold user's latitude
  const [userLongitude, setUserLongitude] = useState(null); // State to hold user's longitude
  const [postings, setPostings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostings();
    fetchUserGeolocation();
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

  const fetchUserGeolocation = async () => {
    try {
      const userAddress = user?.user_address;
      if (userAddress) {
        const geocodeData = await geocodeAddress(userAddress);
        setUserLatitude(geocodeData.latitude);
        setUserLongitude(geocodeData.longitude);
      }
    } catch (error) {
      console.error("Error fetching user's geolocation:", error);
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
            {posting.geocodeData && userLatitude && userLongitude && (
              <div>
                <h4>Distance to User:</h4>
                <p>{calculateDistance(userLatitude, userLongitude, posting.geocodeData.latitude, posting.geocodeData.longitude)} km</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AllPostings;
