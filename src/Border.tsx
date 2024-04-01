import React from "react";
// import { errorHandle } from './apiUtils';
import "./index.css";

const Border: React.FC = () =>{
    return(

        <div className="corner">
        <img className="logohome" src="\src\images\PRJobs_LOGO.png" height={50} width={50} />
        <img className="notifications" src="\src\images\Bell.png" height={50} width={50}/> 
        <img className="setting" src="\src\images\config.png" height={50} width={50}/> 
        </div>
    );

    
}
export default Border;