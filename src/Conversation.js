import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { errorHandler } from "./others/apiUtils";

function Conversation() {
  const location = useLocation();
  const conversation = location.state ? location.state.conversation : null;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (conversation) {
      fetchMessagesBetweenUsers();
    }
  }, [conversation]);

  const fetchMessagesBetweenUsers = async () => {
    try {
      const response = await fetch(
        `/api/messages/users/${conversation.user_id1}/${conversation.user_id2}`
      );
      errorHandler(response);
      const data = await response.json();
      setMessages(data.Messages);
      setLoading(false); // Set loading to false once messages are fetched
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <div>
      <h2>Conversation</h2>
      {loading ? ( // Display loading message while fetching messages
        <p>Loading...</p>
      ) : (
        messages.map((message) => (
          <div key={message.msg_id}>
            <p>Sender: {message.user1_name}</p>
            <p>Message: {message.msg_content}</p>
            <p>Time: {message.msg_time}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Conversation;
