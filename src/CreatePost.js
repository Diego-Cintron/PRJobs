import React, { useState } from "react";
import { errorHandler, maxDescriptionLength } from "./apiUtils";
import { useAuth } from "./AuthContext";
import "./PostingStyles.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userId] = useState(user?.user_id || -1);
  const [postData, setPostData] = useState({
    post_title: "",
    post_description: "",
    post_address: "",
    post_municipality: "",
    user_id: userId,
    cm_id: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isInputValid()) {
      alert(
        "Input is not valid. Verify that all fields are within the character limit and are not empty."
      );
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:80/api/postings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      errorHandler(response);

      navigate(`/postings`);
    } catch (error) {
      console.error("Error creating posting:", error);
    }
  };

  const isInputValid = () => {
    const { post_title, post_description, post_address, post_municipality } =
      postData;
    return (
      post_title.trim() !== "" &&
      post_description.trim() !== "" &&
      post_address.trim() !== "" &&
      post_municipality.trim() !== "" &&
      post_title.length <= 50 &&
      post_description.length <= maxDescriptionLength &&
      post_address.length <= 64 &&
      post_municipality.length <= 20
    );
  };

  return (
    <div>
      <h1>Create New Posting</h1>
      <form onSubmit={handleSubmit}>
        <div className="label-div">
          <label htmlFor="post_title">Title:</label>
          <input
            type="text"
            id="post_title"
            name="post_title"
            value={postData.post_title}
            onChange={(e) =>
              setPostData({ ...postData, post_title: e.target.value })
            }
            className="input-style"
          />
        </div>
        <div className="label-div">
          <label htmlFor="post_description">Description:</label>
          <textarea
            id="post_description"
            name="post_description"
            rows={Math.ceil(maxDescriptionLength / 50)}
            value={postData.post_description}
            onChange={(e) =>
              setPostData({ ...postData, post_description: e.target.value })
            }
            className="textarea-style"
            style={{ resize: "none" }}
          />
        </div>
        <div className="label-div">
          <label htmlFor="post_address">Address:</label>
          <input
            type="text"
            id="post_address"
            name="post_address"
            value={postData.post_address}
            onChange={(e) =>
              setPostData({ ...postData, post_address: e.target.value })
            }
            className="input-style"
          />
        </div>
        <div className="label-div">
          <label htmlFor="post_municipality">Municipality:</label>
          <input
            type="text"
            id="post_municipality"
            name="post_municipality"
            value={postData.post_municipality}
            onChange={(e) =>
              setPostData({ ...postData, post_municipality: e.target.value })
            }
            className="input-style"
          />
        </div>
        <button type="submit">Create Posting</button>
      </form>
    </div>
  );
};

export default CreatePost;
