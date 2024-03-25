import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { errorHandler } from "./apiUtils";
import EditPostingModal from "./EditPostingModal";

function IndividualPostingPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [posting, setPosting] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false); // Used to show or hide modal (DEFAULT: Hidden)
  const [showEditButton] = useState<boolean>(true); // TODO: Will be set to True ONLY if Signed-In user_id matches Posting's user_id

  // Fetch data whenever ID changes
  useEffect(() => {
    if (!id) {
      return; // Return early if id is undefined
    }

    // Fetch data for the specific posting using the ID
    fetchPosting(id);
  }, [id]);

  const fetchPosting = async (post_id: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/postings/${post_id}`);
      errorHandler(response); // Check response status
      const data = await response.json();
      setPosting(data.Posting);
    } catch (error) {
      console.error("Error fetching posting:", error);
    }
  };

  const handleDeleteButtonClick = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/postings/${id}`, {
        method: "DELETE",
      });
      errorHandler(response);
      navigate(`/postings`);
    } catch (error) {
      console.error("Error deleting posting:", error);
    }
  };

  // Display "Loading..." while the data is being fetched
  if (!posting) {
    return <div>Loading...</div>;
  }

  const handleEditButtonClick = () => {
    setShowEditModal(true); // Show the edit modal
  };

  const handleCloseModal = () => {
    setShowEditModal(false); // Hide the edit modal
  };

    return (
    <div>
      {/* Displays current Posting's information */}
      <h2>Individual Posting</h2>
      <h3>Title: {posting.post_title}</h3>
      <p>Description: {posting.post_description}</p>
      <p>Address: {posting.post_address}</p>
      <p>Municipality: {posting.post_municipality}</p>
      <p>Date Submmited: {posting.post_uploaded}</p>
      <p>Expires: {posting.post_expires}</p>

      {/* Edit Button & Delete Button - Hidden if "showEditButton" is false*/}
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

      {/* Show "EditPostingModal" if "showEditModal" is true */}
      {showEditModal && (
        <EditPostingModal posting={posting} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default IndividualPostingPage;
