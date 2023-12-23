import React from 'react'
import "../assets/css/login.css";
import { getIP } from "../user/getUserData.js";
export default function Login() {
    return (
        <div className="login-grid">
            <button  class="item-1" className="button" style={{ backgroundColor: "blue" }}>
                select <br></br> Team blue
            </button>
            <button class="item-2" className="button" style={{ backgroundColor: "green" }}>
                select <br></br> Team green
            </button>
            <button class="item-3" className="button" style={{ backgroundColor: "yellow" }}>
                select <br></br> Team yellow
            </button>
            <button class="item-4" className="button" style={{ backgroundColor: "red" }}>
                select <br></br> Team Red
            </button>
        </div>
    );
}