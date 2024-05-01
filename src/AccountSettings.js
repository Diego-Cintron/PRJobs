import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import { useAuth } from "./AuthContext";
import { errorHandler } from "./others/apiUtils";
import { defaultUserImage } from "./others/apiUtils";
import "./AccountSettingsStyles.css"

const AccountSettings = () => {
  const { user, updateUser } = useAuth();
  const [userId] = useState(user?.user_id || -1);
  const [cm_id] = useState(user?.cm_id || 1);
  const [data, setData] = useState({
    user_id: userId,
    user_type: "",
    user_birthday: "",
    user_fname: "",
    user_lname: "",
    user_phone: "",
    user_email: "",
    user_address: "",
    user_municipality: "",
    user_available: [],
    user_password: "",
    cm_id: cm_id,
  });
  const [updatedData, setUpdatedData] = useState(data);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        errorHandler(response);
        const userData = await response.json();
        setData(userData.User);
        setUpdatedData(userData.User);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  const isDataValid = (data) => {
    return (
      data.user_email.trim() !== "" &&
      data.user_fname.trim() !== "" &&
      data.user_lname.trim() !== "" &&
      data.user_birthday.trim() !== "" &&
      data.user_phone.trim() !== "" &&
      data.user_address.trim() !== ""
    );
  };

  const handleSave = async () => {
    if (!isDataValid(updatedData)) {
      alert("All fields are required");
      return;
    }

    try {
      const { user_id, ...dataToSend } = updatedData;
      console.log(user_id);
      console.log(dataToSend);
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      errorHandler(response);
      const userData = await response.json();
      setData(userData.User);
      setUpdatedData(userData.User);
      updateUser(userData.User);
      alert("Your profile has been updated");
    } catch (error) {
      console.error(error);
      alert("Sorry, something went wrong");
    }
  };

  return (
    <div className="user-block" style={{width: "auto", border: "none"}}>

      <NavigationBar />
      <div className="user-settings">
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2843724221280103"
          crossorigin="anonymous"
        ></script>

        <h2>Account Settings</h2>
        <img className="user-image" style={{objectFit: "fill", height: "200px", width: "200px"}}
          src={user.user_image || defaultUserImage}
          height={100}
          width={100}
          alt="User Image"
        />

        <p className="divider"> </p>
        <div>
          <label htmlFor="user_email">Email address</label>
          <input style={{textAlign: "center"}}
            type="email"
            id="user_email"
            name="user_email"
            value={updatedData.user_email}
            readOnly
          />
        </div>

        <p className="divider"> </p> 
        <b>Name </b>
        <div className="full-name" style={{display: "flex"}}> 
          <input 
            type="text"
            id="user_fname"
            name="user_fname"
            value={updatedData.user_fname}
            onChange={handleChange}
          />
          <input 
            type="text"
            id="user_lname"
            name="user_lname"
            value={updatedData.user_lname}
            onChange={handleChange}
          />
        </div>

        <p className="divider"> </p>
        <div>
          <label htmlFor="user_birthday">Birthday</label>
          <input style={{textAlign: "center"}}
            type="date"
            id="user_birthday"
            name="user_birthday"
            value={updatedData.user_birthday}
            onChange={handleChange}
          />
        </div>

        <p className="divider"> </p>
        <div>
          <label htmlFor="user_phone">Phone</label>
          <input style={{textAlign: "center"}}
            type="tel"
            id="user_phone"
            name="user_phone"
            value={updatedData.user_phone}
            onChange={handleChange}
          />
        </div>

        <p className="divider"> </p>
        <div>
          <label htmlFor="user_address">Address</label>
          <input style={{textAlign: "center"}}
            type="text"
            id="user_address"
            name="user_address"
            value={updatedData.user_address}
            onChange={handleChange}
          />
        </div>

        <p className="divider"> </p>
        <div>
          <label  htmlFor="user_skills">Skills</label>
          <input style={{textAlign: "center", overflow: "auto"}}
            type="text"
            id="user_skills"
            name="user_skills"
            value={updatedData.user_skills}
            onChange={handleChange}
          />
        </div>

        <p className="divider"> </p>
        <div>
          <label htmlFor="user_image">Profile Photo</label>
          <input style={{textAlign: "center"}}
            type="text"
            id="user_image"
            name="user_image"
            value={updatedData.user_image}
            onChange={handleChange}
          />
        </div>

        <div>
          <button class="save" onClick={handleSave}>Save</button>
        </div>
      </div>

    </div>
  );
};

export default AccountSettings;
