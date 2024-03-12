import React, { useState } from "react";

const CreatePost: React.FC = () => {
  const [formData, setFormData] = useState({
    post_title: "",
    post_description: "",
    post_address: "",
    post_municipality: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = {
      ...formData,
      user_id: 1,
      cm_id: 1,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/postings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to create posting");
      }

      console.log("Posting created successfully");
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error("Error creating posting:", error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <div>
      <h1>Create New Posting</h1>
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
        <button type="submit">Create Posting</button>
      </form>
    </div>
  );
};

export default CreatePost;
