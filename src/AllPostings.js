import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "./others/apiUtils";
import { useAuth } from "./AuthContext";
import { geocodeAddress } from "./others/Api";
import { calculateDistance } from "./others/Haversine";
import "./PostingStyles.css";
import config from "./others/config";

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
    <div className="page-background">

      <div className="sorting-buttons" style={{margin: "auto", marginTop: "3%"}}>
        <button className="distance" style={{marginRight: "1%"}}
         onClick={() => handleSortBy("distance")}>
          Distance
          </button>

        <button className="recently-posted" style={{marginRight: "1%"}}
         onClick={() => handleSortBy("recentlyPosted")}>
          Recently Posted
        </button>

        <button className="expires" style={{marginRight: "1%"}}
         onClick={() => handleSortBy("expiresSoon")}>
          Expires Soon
        </button>

      </div>

      {postings.length === 0 ? (
        <p>Loading</p>
      ) : (
        postings.map((posting) => (
          
          <div className="postings" 
          
            key={posting.post_id}
            onClick={() => handlePostingClick(posting.post_id)}
          >
            <h3 className="post-title">{posting.post_title}</h3>

            <p className="post-date">
              {posting.post_uploaded}
            </p>

            <p className="description" 
            style={{margin: "auto", width: "100px", padding: "20px", minHeight: "200px", borderRadius: "25px"}}>
              {posting.post_description}</p>

            {/* Google Maps embedded map */}
            <div style={{ height: "200px", width: "50%", margin: "auto", padding: "20px" }}>
              <iframe
                title="Posting Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/place?key=${
                  config.googleMapsApiKey
                }&q=${encodeURIComponent(posting.post_address)}`}
                allowFullScreen
              ></iframe>
            </div>

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
