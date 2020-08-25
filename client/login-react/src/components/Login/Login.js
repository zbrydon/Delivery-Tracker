import React, { useContext, useState } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import Image from "../Images/Image.jpg";
import "../Login/Login.Modules.css";

const Login = () => {
  // const { LoginState, Authenticated } = useContext(Authenticate);
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    UserName: "",
    Password: "",
  });

  const handleSubmitClick = () => {
    setMessage("");
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
            placeholder="Username"
            required
            onChange={(e) => setState(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            id="Password"
            placeholder="Password"
            required
            onChange={(e) => setState(e.target.value)}
          />
          <button
            type="submit"
            className="btn"
            id="login"
            onClick={handleSubmitClick}
          >
            LOGIN
          </button>
          <BrowserRouter>
            <p>
              Don't have an account? <Link to="#">Sign Up</Link>
            </p>
          </BrowserRouter>
        </form>
      </div>
      <div className="main-img">
        <img src={Image} alt="login images" />
      </div>
    </div>
  );
};

export default Login;
