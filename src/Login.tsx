import React from "react";
// import { errorHandle } from './apiUtils';
import "./index.css";

const Login: React.FC = () =>{
    return(
        <div className="login-area">
            <p>Username</p>
                <table className="login-blocks"></table>
            <p>Password</p>
                <table className="login-blocks"></table>
            <b>Forgot Password</b>
        </div>   
    );

    
}
export default Login;