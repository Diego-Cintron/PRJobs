import React, { useEffect, useState } from "react";
import { defaultUserImage, errorHandler } from "./others/apiUtils";
import { useAuth } from "./AuthContext";
import Conversation from "./Conversation";
import "./PostingStyles.css";
//TODO:
//  Add feature for starting conversations

function Messages() {
  const { user } = useAuth();
  const [userId] = useState(user?.user_id || -1);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

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

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
  };

  return (
    <div className="messagespage">
      <div className="active-block">
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
              {console.log(message)}
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
        {selectedMessage && (
          <Conversation
            user_id1={selectedMessage.user_id1}
            user_id2={selectedMessage.user_id2}
          />
        )}
      </div>
    </div>
  );
}

export default Messages;
