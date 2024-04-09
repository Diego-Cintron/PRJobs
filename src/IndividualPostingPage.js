import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { errorHandler } from "./apiUtils";
import EditPostingModal from "./EditPostingModal";

function IndividualPostingPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [posting, setPosting] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditButton] = useState(true);

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
      navigate(`/postings`);
    } catch (error) {
      console.error("Error deleting posting:", error);
    }
  };

  if (!posting) {
    return <div>Loading...</div>;
  }

  const handleEditButtonClick = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  return (
    <div>
      <h2>Individual Posting</h2>
      <h3>Title: {posting.post_title}</h3>
      <p>Description: {posting.post_description}</p>
      <p>Address: {posting.post_address}</p>
      <p>Municipality: {posting.post_municipality}</p>
      <p>Date Submmited: {posting.post_uploaded}</p>
      <p>Expires: {posting.post_expires}</p>

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
  );
}

export default IndividualPostingPage;
