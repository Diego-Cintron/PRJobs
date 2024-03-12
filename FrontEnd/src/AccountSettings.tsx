import React, { useState, useEffect } from 'react';
import User from "./User";
import { errorHandle } from './apiUtils';

const AccountSettings: React.FC = () => {
  const [data, setData] = useState<User>({} as User);

  useEffect(() => {
    const fetchUser = async () => { 
        try {
            const response = await fetch("http://127.0.0.1:5000/users/2"); // El user esta hard coded por ahora
            errorHandle(response);
            const data = await response.json();
            setData(data.User);
        } catch (error) {
            console.error(error);
        }
    };
    
    fetchUser();
  }, []);

  return (
    <div className="user-settings">
      <h2>Account Settings</h2>
      
      <label>Email address</label>
      <input type="email" value={data.user_email} readOnly />
      
      <label>First name</label>
      <input type="text" value={data.user_fname} readOnly />
      
      <label>Last name</label>
      <input type="text" value={data.user_lname} readOnly />
      
      <label>Birthday</label>
      <input type="datetime" value={data.user_birthday} readOnly />
      
      <label>Phone</label>
      <input type="tel" value={data.user_phone} readOnly />
      
      <label>Address</label>
      <input type="text" value={data.user_address} readOnly />

    </div>
  );
};

export default AccountSettings;
