import React, { useState, useContext } from "react";
import axios from "axios";
import Image from "../Images/Img.jpg";
import "../Register/Register.Modules.css";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [isWarehouse, setIsWarehouse] = useState("warehouse");
  const { setUserData } = useContext(UserContext);

  const history = useHistory();
  const handleSubmitClick = async (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
      passwordCheck,
      displayName,
      isWarehouse,
    };
    await axios.post("http://localhost:5000/users/register", newUser);

    const loginRes = await axios.post("http://localhost:5000/users/login", {
      email,
      password,
    });
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
          <input
            type="password"
            className="form-control"
            id="Password"
            placeholder="Confirm Password"
            required
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Display Name"
            required
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <select
            id="sites"
            name="sites"
            value={isWarehouse}
            onChange={(e) => setIsWarehouse(e.target.value)}
          >
            <option
              value="warehouse"
              onChange={(e) => setIsWarehouse(e.target.value)}
            >
              Warehouse
            </option>
            <option
              value="store"
              onChange={(e) => setIsWarehouse(e.target.value)}
            >
              Store
            </option>
          </select>
          <button
            type="submit"
            className="btn"
            id="login"
            onClick={handleSubmitClick}
          >
            Register
          </button>

          <p>
            Already have account? <a>Sign In</a>
          </p>
        </form>
      </div>
      <div className="main-img">
        <img src={Image} alt="login images" />
      </div>
    </div>
  );
};

export default Register;
