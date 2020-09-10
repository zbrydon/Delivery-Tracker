import React, { useState } from "react";
import Image from "../Images/Img.jpg";
import axios from "axios";
import "../Register/Register.Modules.css";

const Register = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const [location, setLocation] = useState("store1");
  const [message, setMessage] = useState("");

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    if (id == "" || password == "" || confirm_password == "") {
      setMessage("Please input field required");
      return;
    }

    const registerUser = { id, password, confirm_password, location };
    axios
      .post(`${API_URL}/registerStore`, registerUser)
      .then(function (response) {
        let data = response.data;
        setId("");
        setPassword("");
        setConfirm_Password("");
        setLocation("store1");

        setMessage(data.message);
      })
      .catch(function (error) {
        let data = error.response.data;
        setMessage(data.message);
      });
  };

  return (
    <div className="user-container">
      <div className="login-container">
        <form>
          <h1>Register</h1>
          <h3 style={{ color: "red" }}>{message}</h3>
          <input
            type="text"
            className="form-control"
            id="UserName"
            placeholder="Id"
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            id="Password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            id="Password"
            placeholder="Confirm Password"
            required
            value={confirm_password}
            onChange={(e) => setConfirm_Password(e.target.value)}
          />

          <select
            id="sites"
            name="sites"
            onChange={(e) => setLocation(e.target.value)}
          >
            <option
              value="store1"
              selected={location == "store1" ? true : false}
            >
              Store 1
            </option>
            <option
              value="store2"
              selected={location == "store2" ? true : false}
            >
              Store 2
            </option>
            <option
              value="store3"
              selected={location == "store3" ? true : false}
            >
              Store 3
            </option>
            <option
              value="store4"
              selected={location == "store4" ? true : false}
            >
              Store 4
            </option>
          </select>
          <button
            type="submit"
            className="register-button"
            id="login"
            onClick={handleSubmitClick}
          >
            Register
          </button>

          <p>
            Already have account?
            <a href={"/login"}>Sign In</a>
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
