import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { errorHandler } from "./others/apiUtils";

function Conversation() {
  const location = useLocation();
  const conversation = location.state ? location.state.conversation : null;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (conversation) {
      fetchConversationData();
    }
  }, [conversation]);

  // Fetch the messages and the name of the other user
  const fetchConversationData = async () => {
    try {
      // Fetch other user's name
      const userResponse = await fetch(`/api/users/${conversation.user_id2}`);
      errorHandler(userResponse);
      const userData = await userResponse.json();
      setUserName(userData.User.user_fname);

      // Fetch messages between users
      const messagesResponse = await fetch(
        `/api/messages/users/${conversation.user_id1}/${conversation.user_id2}`
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
          user_id1: conversation.user_id1, // Currently signed in user
          user_id2: conversation.user_id2, // Receiver
        }),
      });
      errorHandler(response);
      setNewMessage("");
      fetchConversationData(); // Update conversation
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <h1>Conversation with: {userName}</h1>
      {loading ? (
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
      {/* Form for sending a new message */}
      <form onSubmit={handleSendMessage}>
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
