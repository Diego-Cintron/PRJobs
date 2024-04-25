import React, { useEffect, useState } from "react";
import { errorHandler } from './others/apiUtils';

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [skilledUsers, setSkilledUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        errorHandler(response);
        const data = await response.json();
        setUsers(data.Users);
        setSkilledUsers(data.Users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    if (searchTerm !== "") {
      const searchTermLower = searchTerm.toLowerCase();
      const filteredUsers = users.filter((user) =>
        user.user_skills && user.user_skills.some((skill) =>
          skill.toLowerCase() === searchTermLower
        )
      );
      setSkilledUsers(filteredUsers);
    } else {
      setSkilledUsers(users);
    }
    
  };
  

  return (
    <div className="user-list">
      <p>User List</p>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by skill"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {skilledUsers.map((person) => (
            <tr key={person.user_id}>
              <td>{person.user_email}</td>
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
