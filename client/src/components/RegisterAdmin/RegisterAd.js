import React from "react";
import "./RegisterAd.css";
import axios from "axios";

const RegisterAdmin = () => {
  return (
    <div>
      <form className="formRe">
        <h1 className="headRe">
          <strong>Admin Register</strong>
        </h1>

        <label for="userID">User ID: </label>
        <input type="text" id="userID" />
        <label for="RePassword">Password </label>
        <input type="password" id="RePassword" />
        <label for="ConPassword">Confirm Password </label>
        <input type="password" id="ConPassword" />
        <a>
          <button className="update-btn">Register</button>
        </a>
      </form>
    </div>
  );
};

export default RegisterAdmin;
