import { useEffect, useState } from "react";
import { errorHandle } from './apiUtils';

function AllPostings() {
  const [postings, setPostings] = useState<any[]>([]);

  useEffect(() => {
    fetchPostings();
  }, []);

  const fetchPostings = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/postings");
      errorHandle(response); // Check response status
      const data = await response.json();
      setPostings(data.Postings);
    } catch (error) {
      console.error("Error fetching postings:", error);
    }
  };

  const handlePostingClick = (id: number) => {
    console.log("Clicked! post_id:", id);
  };

  return (
    <div>
      <h2>All Postings</h2>
      {postings.map((posting) => (
        <div
          key={posting.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            marginLeft: "10px",
            marginBottom: "10px",
            cursor: "pointer",
          }}
          onClick={() => handlePostingClick(posting.post_id)}
        >
          <h3>{posting.post_title}</h3>
          <p>{posting.post_description}</p>
        </div>
      ))}
    </div>
  );
}

export default AllPostings;
