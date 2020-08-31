import React from "react";
import Image from "../Images/Img.jpg";
import "../Login/Login.Modules.css";

const Login = () => {
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
            // onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            id="Password"
            placeholder="Password"
            required
            // onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="btn"
            id="login"
            // onClick={handleSubmitClick}
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
