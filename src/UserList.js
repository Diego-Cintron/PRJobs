import React, { useEffect, useState } from "react";
import AccountSettings from "./AccountSettings";
import { errorHandler } from './apiUtils';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:80/api/users");
        errorHandler(response);
        const data = await response.json();
        setUsers(data.Users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      <p>User List</p>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((person) => (
            <tr key={person.user_id}>
              <td>{person.user_id}</td>
              <td>{person.user_fname}</td>
              <td>{person.user_lname}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AccountSettings />
    </div>
  );
};

export default UserList;
