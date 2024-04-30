import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { errorHandler, maxDescriptionLength } from "./others/apiUtils";
import { useAuth } from "./AuthContext";
import "./PostingStyles.css";

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userId] = useState(user?.user_id || -1);
  const [companyId] = useState(user?.cm_id || -1);
  const [postData, setPostData] = useState({
    post_title: "",
    post_description: "",
    post_address: "",
    post_municipality: "",
    user_id: userId,
    cm_id: companyId,
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
      const response = await fetch("/api/postings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      errorHandler(response);
      const data = await response.json();

      alert("Your post was successfully created.");
      navigate(`/postings/data.Posting.post_id`);
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

  if (user.user_type !== "poster") {
    return (
      <div className="createpost-block">
        <p>
          Sorry, but you are not registered as a User with the necessary
          permissions to create a new Post.
        </p>
      </div>
    );
  }

  if (companyId < 2) {
    return (
      <div className="createpost-block">
        <p>
          Sorry, but you must first create a Company profile before creating a Posting.
          Click <Link to="/company">here</Link> to go there now.
        </p>
      </div>
    );
  }

  return (
    <div className="createpost-block">
      <form onSubmit={handleSubmit}>
        <div className="label-div">
          <h1>Create New Posting</h1>
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
