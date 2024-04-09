import React from "react";
// import { errorHandle } from './apiUtils';
import "./index.css";

const BottomBorder = () =>{
    return(

        <div className="bottom-bar">
            <p className="search-button">Search Here!</p> 
            <img className="setting" src="\src\images\config.png" height={50} width={50}/> 
        </div>
    );

    
}
export default BottomBorder;