import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { errorHandler } from "./others/apiUtils";
import { useAuth } from "./AuthContext";
import NavigationBar from "./NavigationBar";
import EditPostingModal from "./EditPostingModal";
import UserProfile from "./UserProfile";
import Company from "./Company";
import config from "./others/config";

function IndividualPostingPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [userId] = useState(user?.user_id || -1);
  const [showEditButton] = useState(userId == id); // Show Edit and Delete if User is the one who created the Posting
  const [posting, setPosting] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    fetchPosting(id);
  }, [id]);

  const fetchPosting = async (post_id) => {
    try {
      const response = await fetch(`/api/postings/${post_id}`);
      errorHandler(response);
      const data = await response.json();
      setPosting(data.Posting);
    } catch (error) {
      console.error("Error fetching posting:", error);
    }
  };

  const handleDeleteButtonClick = async () => {
    try {
      const response = await fetch(`/api/postings/${id}`, {
        method: "DELETE",
      });
      errorHandler(response);
      navigate(`/`);
    } catch (error) {
      console.error("Error deleting posting:", error);
    }
  };

  if (!posting) {
    return <div style={{textAlign: "center"}}>Loading...</div>;
  }

  const handleEditButtonClick = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <UserProfile />
        <div style={{maxWidth:"50%"}}>
          <h2>Individual Posting</h2>
          <h3>Title: {posting.post_title}</h3>
          <p>Description: {posting.post_description}</p>
          <p>Address: {posting.post_address}</p>
          <p>Municipality: {posting.post_municipality}</p>
          <p>Date Submitted: {posting.post_uploaded}</p>
          <p>Expires: {posting.post_expires}</p>

          {/* Google Maps embedded map */}
          <div style={{ height: "400px", width: "100%" }}>
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

          {showEditButton && (
            <button onClick={handleEditButtonClick} className="edit-button">
              Edit
            </button>
          )}
          {showEditButton && (
            <button onClick={handleDeleteButtonClick} className="delete-button">
              Delete
            </button>
          )}

          {showEditModal && (
            <EditPostingModal posting={posting} onClose={handleCloseModal} />
          )}
        </div>
        <Company companyId={posting.cm_id} />
      </div>
    </div>
  );
}

export default IndividualPostingPage;
