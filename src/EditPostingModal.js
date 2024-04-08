import React, { useState } from "react";
import { errorHandler, maxDescriptionLength } from "./apiUtils";

const EditPostingModal = ({ posting, onClose }) => {
  const [formData, setFormData] = useState({
    post_title: posting.post_title,
    post_description: posting.post_description,
    post_address: posting.post_address,
    post_municipality: posting.post_municipality,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/postings/${posting.post_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            cm_id: posting.cm_id,
            user_id: posting.user_id,
          }),
        }
      );

      errorHandler(response);

      window.location.reload();
    } catch (error) {
      console.error("Error updating posting:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Edit Posting</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="post_title">Title:</label>
            <input
              type="text"
              id="post_title"
              name="post_title"
              value={formData.post_title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="post_description">Description:</label>
            <textarea
              id="post_description"
              name="post_description"
              value={formData.post_description}
              onChange={handleChange}
              maxLength={maxDescriptionLength}
              rows={Math.ceil(formData.post_description.length / 50)}
            />
          </div>
          <div>
            <label htmlFor="post_address">Address:</label>
            <input
              type="text"
              id="post_address"
              name="post_address"
              value={formData.post_address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="post_municipality">Municipality:</label>
            <input
              type="text"
              id="post_municipality"
              name="post_municipality"
              value={formData.post_municipality}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="edit-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPostingModal;
