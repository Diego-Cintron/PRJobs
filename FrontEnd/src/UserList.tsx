import React, { useEffect, useState } from "react";
import User from "./User"; // Import the User interface
import "./index.css";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.Users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
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
      </div>
      <div className="secondDiv">
        <h1> Example 1</h1>
        <h2> Example 2</h2>
      </div>
    </div>
  );
};

export default UserList;
