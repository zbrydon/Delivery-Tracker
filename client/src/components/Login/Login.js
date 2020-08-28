import React, { useState, useContext } from "react";
import Image from "../Images/Img.jpg";
import "../Login/Login.Modules.css";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { setUserData } = useContext(UserContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const history = useHistory();

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    const loginUser = { email, password };
    const loginRes = await axios.post(
      "http://localhost:5000/users/login",
      loginUser
    );
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    });
    if (loginRes.data.user.isWarehouse === "warehouse") {
      history.push("/home");
      localStorage.setItem("auth-token", loginRes.data.token);
    } else {
      history.push("/home2");
      localStorage.setItem("auth-token", loginRes.data.token);
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
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
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
            id="login"
            onClick={handleSubmitClick}
          >
            LOGIN
          </button>

          <p>
            Don't have an account? <a>Sign Up</a>
          </p>
        </form>
      </div>
      <div className="main-img">
        <img src={Image} alt="login images" />
      </div>
    </div>
  );
};

export default Login;
