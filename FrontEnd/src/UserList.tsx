import { useEffect, useState } from "react";
import User from "./User"; // Import the User interface
import AccountSettings from "./AccountSettings";
import { errorHandler } from './apiUtils';
import "./index.css";

function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/users");
        errorHandler(response); // Check response status
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
