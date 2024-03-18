import React from "react";
// import { errorHandle } from './apiUtils';
import "./index.css";

const Posts: React.FC = () =>{
    return(
       <div className="post-block">
        <p className="postname">Company Name</p>
        <p className="postdate">Date Posted</p>
        <img src="\src\images\mesonrecruit.jpg" height={200} width={300}></img>
        <p className="postdescription">Post Description</p>
        <p className="morepostinfo">Addtional Information</p>
        <p className="map">Map</p>
        <p className="searchjobs">
            <img src="\src\images\Male Avatar.jpg" height={20} width={20}></img>
            Search Jobs 
            <img src="\src\images\search.png" height={20} width={20}></img></p>
       </div>
    );

    
}
export default Posts;