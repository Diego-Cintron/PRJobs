import React, { useEffect, useState } from "react";
import { errorHandler } from "./others/apiUtils";
import NavigationBar from "./NavigationBar";

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
      const filteredUsers = users.filter(
        (user) =>
          user.user_skills &&
          user.user_skills.some(
            (skill) => skill.toLowerCase() === searchTermLower
          )
      );
      setSkilledUsers(filteredUsers);
    } else {
      setSkilledUsers(users);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="user-list">
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2843724221280103"
          crossorigin="anonymous"
        ></script>

        <p className="standard-paragraph">Search for Skills</p>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search Users by Skill"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <table className="user-table" style={{background: "white"}}>
          <thead>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {skilledUsers.map((person) => (
              <tr key={person.user_id}>
                <td>{person.user_email}</td>
                <td>{person.user_fname}</td>
                <td>{person.user_lname}</td>
                <td>
                  {person.user_skills && person.user_skills.map((skill, index) => (
                   <span key={index}>{skill}{index !== person.user_skills.length - 1 ? ', ' : ''}</span>
                  ))}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
