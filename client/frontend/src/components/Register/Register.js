import React from "react";
import Image from "../Images/Img.jpg";
import "../Register/Register.Modules.css";

const Register = () => {
  return (
    <div className="user-container">
      <div className="login-container">
        <form>
          <h1>Register</h1>
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
          <input
            type="password"
            className="form-control"
            id="Password"
            placeholder="Confirm Password"
            required
            // onChange={(e) => setPasswordCheck(e.target.value)}
          />

          <select id="sites" name="sites">
            <option value="store1">Store 1</option>
            <option value="store2">Store 2</option>
            <option value="store3">Store 3</option>
            <option value="store4">Store 4</option>
          </select>
          <button
            type="submit"
            className="btn"
            id="login"
            // onClick={handleSubmitClick}
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
