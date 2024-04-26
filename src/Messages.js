import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultUserImage, errorHandler } from "./others/apiUtils";
import { useAuth } from "./AuthContext";
import "./PostingStyles.css";
//TODO:
//  Add feature for starting conversations

function Messages() {
  const { user } = useAuth();
  const [userId] = useState(user?.user_id || -1);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/messages/user/${userId}`);
      errorHandler(response);
      const data = await response.json();

      // Filter duplicate correspondences
      const uniqueCorrespondences = [];
      const seenCorrespondences = new Set();
      data.Message.forEach((message) => {
        const key =
          message.user_id1 < message.user_id2
            ? `${message.user_id1}-${message.user_id2}`
            : `${message.user_id2}-${message.user_id1}`;
        if (!seenCorrespondences.has(key)) {
          seenCorrespondences.add(key);
          uniqueCorrespondences.push(message);
        }
      });
      setMessages(uniqueCorrespondences);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleMessageClick = (conversation) => {
    navigate(
      `/conversation/${conversation.user_id1}/${conversation.user_id2}`,
      {
        state: { conversation },
      }
    );
  };

  return (
    <div>
      <h1>All Messages</h1>
      {messages.length === 0 ? (
        <p>Loading</p>
      ) : (
        messages.map((message) => (
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
            key={message.msg_id}
            onClick={() => handleMessageClick(message)}
          >
            {console.log(message)}
            <h3>
              {userId === message.user_id1
                ? message.user2_name
                : message.user1_name}
            </h3>
            <img
              src={
                userId === message.user_id1
                  ? message.user2_image || defaultUserImage
                  : message.user1_image || defaultUserImage
              }
              style={{ maxWidth: "50px" }}
            />
            <p>{message.msg_content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Messages;
