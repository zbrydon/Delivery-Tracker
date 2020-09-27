import React, { useState } from "react";
import Image from "../Images/Img.jpg";
import "../Login/Login.Modules.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [id, setId] = useState();
  const [password, setPassword] = useState();

  const history = useHistory();

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    const loginUser = { id, password };
    const loginRes = await axios.post(`${API_URL}/login`, loginUser);

    if (loginRes.data.type === "warehouse") {
        history.push("/warehouseDB");
      localStorage.setItem(
        "auth-token",
        "Bearer " + loginRes.data.tokens.token
      );
    } else {
        history.push("/StoreDB");
      localStorage.setItem(
        "auth-token",
        "Bearer " + loginRes.data.tokens.token
      );
    }
  };

  return (
    <div className="user-container">
      <div className="login-container">
        <form>
          <h1>Login</h1>
          <input
            type="text"
            className="form-control"
            id="UserName"
            placeholder="ID"
            required
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            id="Password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="btn"
            id="login_btn"
            onClick={handleSubmitClick}
          >
            LOGIN
          </button>
        </form>
      </div>
      <div className="main-img">
        <img src={Image} alt="login images" />
      </div>
    </div>
  );
};

export default Login;
