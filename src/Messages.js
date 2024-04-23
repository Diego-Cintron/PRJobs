import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "./others/apiUtils";
import { useAuth } from "./AuthContext";
import "./PostingStyles.css";

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

      // Create a map that contains the latest message for each correspondence
      const correspondenceMap = new Map();

      // Iterate through messages and update "correspondenceMap"
      data.Message.forEach((message) => {
        const otherUserName =
          message.user_id1 === userId ? message.user2_name : message.user1_name;
        const otherUserImage =
          message.user_id1 === userId
            ? message.user2_image
            : message.user1_image;

        const correspondenceKey =
          message.user_id1 < message.user_id2
            ? `${message.user_id1}-${message.user_id2}`
            : `${message.user_id2}-${message.user_id1}`;

        // Update the map if the message is newer or doesn't exist in the map
        if (
          !correspondenceMap.has(correspondenceKey) ||
          message.msg_time > correspondenceMap.get(correspondenceKey).msg_time
        ) {
          correspondenceMap.set(correspondenceKey, {
            ...message,
            otherUserName,
            otherUserImage,
          });
        }
      });

      // Updates "messages" state
      setMessages(Array.from(correspondenceMap.values()));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleMessageClick = (id) => {
    navigate(`/messages/${id}`);
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
            onClick={() => handleMessageClick(message.msg_id)}
          >
            <h3>{message.otherUserName}</h3>
            <img src={message.otherUserImage} alt="Receiver Image" />
            <p>{message.msg_content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Messages;
