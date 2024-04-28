import React, { useEffect, useState } from "react";
import { defaultUserImage, errorHandler } from "./others/apiUtils";
import { useAuth } from "./AuthContext";
import Conversation from "./Conversation";
import "./PostingStyles.css";

function Messages() {
  const { user } = useAuth();
  const [userId] = useState(user?.user_id || -1);
  const [messages, setMessages] = useState([]);
  const [selectedOtherUser, setSelectedOtherUser] = useState(null);
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/messages/user/${userId}`);
      errorHandler(response);
      const data = await response.json();

      // Filter duplicate correspondences and switch user IDs if necessary
      const uniqueCorrespondences = [];
      const seenCorrespondences = new Set();
      data.Message.forEach((message) => {
        let newMessage;
        if (message.user_id1 !== userId) {
          // Switch user_IDs if user_id1 is not the currently Signed In user
          newMessage = {
            ...message,
            user_id1: message.user_id2,
            user_id2: message.user_id1,
            user1_name: message.user2_name,
            user1_image: message.user2_image,
            user2_name: message.user1_name,
            user2_image: message.user1_image,
          };
        } else {
          newMessage = message;
        } // End user_ID switching
        const key =
          newMessage.user_id1 < newMessage.user_id2
            ? `${newMessage.user_id1}-${newMessage.user_id2}`
            : `${newMessage.user_id2}-${newMessage.user_id1}`;
        if (!seenCorrespondences.has(key)) {
          seenCorrespondences.add(key);
          uniqueCorrespondences.push(newMessage);
        }
      });
      setMessages(uniqueCorrespondences);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSearchUser = async (email) => {
    try {
      const response = await fetch(`/api/users/${email}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setSelectedOtherUser(data.User.user_id);
          console.log(selectedOtherUser);
        } else {
          console.error("User not found");
        }
      } else {
        console.error("Failed to fetch user:", response.statusText);
      }
    } catch (error) {
      console.error("Error searching for user:", error);
    }
  };

  const handleMessageClick = (message) => {
    setSelectedOtherUser(message.user_id2);
  };

  const handleSearchInputChange = (event) => {
    setSearchEmail(event.target.value);
  };

  return (
    <div className="messagespage">
      <div className="active-block">
        <div className="search-section">
          <h2>New Chat</h2>
          <input
            type="text"
            placeholder="Enter user email"
            value={searchEmail}
            onChange={handleSearchInputChange}
          />
          <button onClick={() => handleSearchUser(searchEmail)}>Search</button>
        </div>
        <h1>Active Chats</h1>
        {messages.length === 0 ? (
          <p>Loading...</p>
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
              <h3>
                {userId === message.user_id1
                  ? message.user2_name
                  : message.user1_name}
              </h3>
              <img
                src={message.user2_image || defaultUserImage}
                alt=""
                style={{ maxWidth: "50px" }}
              />
              <p>{message.msg_content}</p>
            </div>
          ))
        )}
      </div>
      <div className="messagebox">
        {selectedOtherUser && (
          <Conversation
            user_id1={userId} // Currently signed in user
            user_id2={selectedOtherUser}
          />
        )}
      </div>
    </div>
  );
}

export default Messages;
