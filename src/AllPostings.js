import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "./others/apiUtils";
import { useAuth } from "./AuthContext";
import { geocodeAddress } from "./others/Api";
import { calculateDistance } from "./others/Haversine";
import "./PostingStyles.css";

function AllPostings() {
  const { user } = useAuth();
  const [userId] = useState(user?.user_id || -1);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [postings, setPostings] = useState([]);
  const [sortedBy, setSortedBy] = useState(null);
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

  // Sort postings by expires soon
  const sortByExpiresSoon = () => {
    const sortedPostings = [...postings].sort((a, b) => {
      const dateA = new Date(a.post_expires);
      const dateB = new Date(b.post_expires);
      return dateA - dateB; // Ascending order
    });
    setSortedBy("expiresSoon");
    setPostings(sortedPostings);
  };

  // Sort postings by recently posted
  const sortByRecentlyPosted = () => {
    const sortedPostings = [...postings].sort((a, b) => {
      const dateA = new Date(a.post_uploaded);
      const dateB = new Date(b.post_uploaded);
      return dateB - dateA; // Descending order
    });
    setSortedBy("recentlyPosted");
    setPostings(sortedPostings);
  };

  // Sort postings by distance to the user
  const sortByDistance = () => {
    const sortedPostings = [...postings].sort((a, b) => {
      const distanceA = calculateDistanceToUser(a);
      const distanceB = calculateDistanceToUser(b);
      if (isNaN(distanceA)) return 1; // Treat NaN as greater than other distances
      if (isNaN(distanceB)) return -1; // Treat NaN as less than other distances
      return distanceA - distanceB;
    });
    setSortedBy("distance");
    setPostings(sortedPostings);
  };

  const calculateDistanceToUser = (posting) => {
    if (!userLatitude || !userLongitude) return Number.MAX_VALUE; // Handle case where the user's geolocation is not available
    const postingLatitude = posting.geocodeData?.latitude || 0;
    const postingLongitude = posting.geocodeData?.longitude || 0;
    if (
      !postingLatitude ||
      !postingLongitude ||
      isNaN(postingLatitude) ||
      isNaN(postingLongitude)
    ) {
      return NaN; // Handle case where the posting's geolocation is invalid
    }
    const distance = calculateDistance(
      userLatitude,
      userLongitude,
      postingLatitude,
      postingLongitude
    );
    return distance;
  };

  const handleSortBy = (sortType) => {
    switch (sortType) {
      case "distance":
        sortByDistance();
        break;
      case "recentlyPosted":
        sortByRecentlyPosted();
        break;
      case "expiresSoon":
        sortByExpiresSoon();
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="sorting-buttons">
        <button onClick={() => handleSortBy("distance")}>Distance</button>
        <button onClick={() => handleSortBy("recentlyPosted")}>
          Recently Posted
        </button>
        <button onClick={() => handleSortBy("expiresSoon")}>
          Expires Soon
        </button>
      </div>
      {postings.length === 0 ? (
        <p>Loading</p>
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
              background: "white",
              color: "black",
            }}
            key={posting.post_id}
            onClick={() => handlePostingClick(posting.post_id)}
          >
            <h3>{posting.post_title}</h3>
            <p>{posting.post_description}</p>
            <div>
              <h4>Distance to User:</h4>
              <p>
                {isNaN(calculateDistanceToUser(posting))
                  ? "N/A"
                  : calculateDistanceToUser(posting)}{" "}
                km
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AllPostings;
