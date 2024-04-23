import React, { useEffect, useState } from "react";
import AccountSettings from "./AccountSettings";
import { errorHandler } from './others/apiUtils';

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        errorHandler(response);
        const data = await response.json();
        console.log("DATA: ", data);
        setUsers(data.Users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  console.log("Normal: ", normalizedSearchTerm);
  console.log("BB: ", searchTerm);

  const filteredUsers = users.filter((user) =>
    user.skills && user.skills.some((skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="user-list">
      <p>User List</p>
      <input
        type="text"
        placeholder="Search by skill..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((person) => (
            <tr key={person.user_id}>
              <td>{person.user_id}</td>
              <td>{person.user_fname}</td>
              <td>{person.user_lname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
