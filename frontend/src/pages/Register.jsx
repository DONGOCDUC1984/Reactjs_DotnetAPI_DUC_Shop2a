import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { environment } from "../services/Environment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faEye,
  faPencil,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Navigate } from "react-router-dom";
import { CommonContext } from "../components/UCProvider";

function Register() {
  var {
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    password2,
    setPassword2,
    user,
  } = useContext(CommonContext);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);
  var navigate = useNavigate();
  function register(userName, email, password) {
    Axios.post(environment.baseUrlAPI + "/authenticate/register", {
      userName: userName,
      email: email,
      password: password,
    })
      .then((res) => {
        setUserName("");
        setEmail("");
        setPassword("");
        setPassword2("");
        Swal.fire({
          title: "Success!",
          text: "Successfully Registered",
          icon: "success",
        });
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Username already existed.Change username",
          icon: "error",
        });
      });
  }

  function handleRegister(e) {
    e.preventDefault();
    if (password !== password2) {
      Swal.fire({
        title: "Error!",
        text: "Password do not match.Try again .",
        icon: "error",
      });
    } else {
      register(userName, email, password);
    }
  }

  function showHide() {
    if (type === "password") {
      setType("text");
      setIcon(faEye);
    } else {
      setType("password");
      setIcon(faEyeSlash);
    }
  }

  function reset(e) {
    e.preventDefault();
    setUserName("");
    setEmail("");
    setPassword("");
    setPassword2("");
  }

  return (
    <form className="mt-1" onSubmit={handleRegister}>
      <h3> Register </h3>
      <label> Username: </label>
      <br />
      <input
        className="mt-1"
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <br />
      <label> Email: </label>
      <br />
      <input
        className="mt-1"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <label> Password: </label>
      <br />
      <div>
        <input
          className="mt-1"
          type={type}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FontAwesomeIcon
          onClick={showHide}
          style={{ marginLeft: "-35px" }}
          icon={icon}
        />
      </div>
      <label> Confirm Password: </label>
      <br />
      <div>
        <input
          className="mt-1"
          type={type}
          placeholder="Confirm Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <FontAwesomeIcon
          onClick={showHide}
          style={{ marginLeft: "-35px" }}
          icon={icon}
        />
      </div>
      <button className="mt-2 btn btn-success" type="submit">
        <FontAwesomeIcon icon={faPencil} /> Register
      </button>{" "}
      <button className="mt-2 btn btn-outline-primary" onClick={reset}>
        <FontAwesomeIcon icon={faArrowsRotate} />
        Reset
      </button>
      {user && <Navigate to="/login" />}
    </form>
  );
}

export default Register;
