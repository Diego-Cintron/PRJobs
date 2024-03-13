import React, { useState, useEffect } from 'react';
import User from "./User";
import { errorHandle } from './apiUtils';

const AccountSettings: React.FC = () => {
  const [data, setData] = useState<User>({} as User);
  const [updatedData, setUpdatedData] = useState<User>({} as User)

  useEffect(() => {
    const fetchUser = async () => { 
        try {
            const response = await fetch("http://127.0.0.1:5000/users/3"); // El user esta hard coded por ahora
            errorHandle(response);
            const data = await response.json();
            setData(data.User);
            setUpdatedData(data.User);
        } catch (error) {
            console.error(error);
        }
    };
    
    fetchUser();
  }, []);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedData({
        ...updatedData,
        [event.target.name]: event.target.value
    })
  }


  const handleSave = async ()  => {
    try {
        const response = await fetch("http://127.0.0.1:5000/users/3", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        })
        errorHandle(response);
        const data = await response.json();
        setData(data.User);
        setUpdatedData(data.User);
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div className="user-settings">
      <h2>Account Settings</h2>
      
      <label>Email address</label>
      <input type="email" name="user_email" value={updatedData.user_email || ""} onChange={handleChange} />
      
      <label>First name</label>
      <input type="text" name="user_fname" value={data.user_fname} readOnly />
      
      <label>Last name</label>
      <input type="text" value={data.user_lname} readOnly />
      
      <label>Birthday</label>
      <input type="datetime" value={data.user_birthday} readOnly />
      
      <label>Phone</label>
      <input type="tel" value={data.user_phone} readOnly />
      
      <label>Address</label>
      <input type="text" value={data.user_address} readOnly />

      <button onClick={handleSave}>Save</button>

    </div>
  );
};

export default AccountSettings;
