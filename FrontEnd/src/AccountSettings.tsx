import React, { useState, useEffect } from 'react';
import User from "./User";
import { errorHandle } from './apiUtils';

const AccountSettings: React.FC = () => {

  const [userId, setUserId] = useState<number>(2); // TODO: get user id dynamically

  const [data, setData] = useState<User>({
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
  });

  const [updatedData, setUpdatedData] = useState<User>({
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
  });
 
  
  useEffect(() => {
    const fetchUser = async () => { 
        try {
            const response = await fetch(`http://127.0.0.1:5000/users/${userId}`);
            errorHandle(response);
            const data = await response.json();
            setData(data.User);
            setUpdatedData(data.User);
        } catch (error) {
            console.error(error);
        }
    };
    
    fetchUser();
  }, [userId]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedData({
        ...updatedData,
        [event.target.name]: event.target.value
    })
  }


  const handleSave = async () => {
    // Validar que los datos no esten vacios
    if (!updatedData.user_email.trim()) {alert("Email address is required"); return;}
    if (!updatedData.user_fname.trim()) {alert("First Name  is required"); return;}
    if (!updatedData.user_lname.trim()) { alert("Last Name is required");return; }
    if (!updatedData.user_birthday.trim()) {alert("Birthday is required"); return;}
    if (!updatedData.user_phone.trim()) {alert("Phone  number is required"); return;}
    if (!updatedData.user_address.trim()) {alert("Address is required"); return;}
    try {
      //Crea una copia de updatedData sin el user_id
      const { user_id, ...dataToSend } = updatedData;
      const response = await fetch(`http://127.0.0.1:5000/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      errorHandle(response);
      const data = await response.json();
      setData(data.User);
      setUpdatedData(data.User);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="user-settings">
      <h2>Account Settings</h2>
      
      <label>Email address</label>
      <input type="email" name="user_email" value={updatedData.user_email} onChange={handleChange} />
      
      <label>First name</label>
      <input type="text" name="user_fname" value={updatedData.user_fname} onChange={handleChange} />
      
      <label>Last name</label>
      <input type="text" name="user_lname" value={updatedData.user_lname} onChange={handleChange} />
      
      <label>Birthday</label>
      <input type="datetime" name="user_birthday" value={updatedData.user_birthday} onChange={handleChange} />
      
      <label>Phone</label>
      <input type="tel" name="user_phone" value={updatedData.user_phone} onChange={handleChange} />
      
      <label>Address</label>
      <input type="text" name="user_address" value={updatedData.user_address} onChange={handleChange} />

      <button onClick={handleSave}>Save</button>

    </div>
  );
};


export default AccountSettings;