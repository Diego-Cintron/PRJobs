import React, { useEffect, useState } from "react";
import { errorHandler } from "./others/apiUtils";

function Conversation({ user_id1, user_id2 }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetchConversationData();
  }, [user_id1, user_id2]);

  // Fetch the messages and the name of the other user
  const fetchConversationData = async () => {
    try {
      // Fetch other user's name
      const userResponse = await fetch(`/api/users/${user_id2}`);
      errorHandler(userResponse);
      const userData = await userResponse.json();
      setUserName(userData.User.user_fname);

      // Fetch messages between users
      const messagesResponse = await fetch(
        `/api/messages/users/${user_id1}/${user_id2}`
      );
      errorHandler(messagesResponse);
      const messagesData = await messagesResponse.json();
      setMessages(messagesData.Messages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching conversation data:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msg_content: newMessage,
          user_id1: user_id1, // Currently signed in user
          user_id2: user_id2, // Receiver
        }),
      });
      errorHandler(response);
      setNewMessage("");
      fetchConversationData(); // Update conversation
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const calculateMarginLeft = (name) => {
    const nameLength = name.length * 8; // Assuming 1 character = 8 pixels
    return `calc(530px - ${nameLength}px)`;
  };

  return (
    <div className="conversation">
      <div className="username-conversation">
        <h1>Conversation with: {userName}</h1>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        // Map displaying all messages in a conversation
        messages.map((message) => (
          <div className="conversation-block" key={message.msg_id}>
            <p
              className={
                message.user_id1 === user_id1 ? "sender-name" : "receiver-name"
              }
              style={{
                marginLeft:
                  message.user_id1 === user_id1
                    ? calculateMarginLeft(message.user1_name)
                    : "auto",
              }}
            >
              {message.user1_name}
            </p>
            <div
              className={
                message.user_id1 === user_id1
                  ? "sent-message"
                  : "received-message"
              }
            >
              <p>{message.msg_content}</p>
            </div>
            <p
              className={
                message.user_id1 === user_id1 ? "sender-time" : "receiver-time"
              }
            >
              {message.msg_time}
            </p>
          </div>
        ))
      )}
      {/* Form for sending a new message */}
      <form className="type-message" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Conversation;
