import React from "react";
// import { errorHandle } from './apiUtils';
import "./index.css";

const UserProfile: React.FC = () =>{
    return(
       <div className="user-block">
        <img src="\src\images\Male Avatar.jpg" height={100} width={100}/> 
        <p className="description">Description</p>
        <p className="profilename">Name LastName</p>
        <p className="email">Email</p>
        <p className="skill">Skills #add bullet points function</p>
        <p className="map">Map</p>


       </div>
    );

    
}
export default UserProfile;