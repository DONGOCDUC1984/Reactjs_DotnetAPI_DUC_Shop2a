import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { environment } from "../services/Environment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faEyeSlash,
  faEye,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";
import { CommonContext } from "../components/UCProvider";

function Login() {
  var { userName, setUserName, password, setPassword, user, setUser } =
    useContext(CommonContext);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);

  function login(userName, password) {
    Axios.post(environment.baseUrlAPI + "/authenticate/login", {
      userName: userName,
      password: password,
    })
      .then((res) => {
        //console.log(res.data);
        localStorage.setItem("token", res.data.token);
        var JsonParseToken = JSON.parse(
          window.atob(localStorage.getItem("token").split(".")[1])
        );
        //console.log(JsonParseToken);
        setUser(JsonParseToken);
        setUserName("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Wrong username or wrong password",
          icon: "error",
        });
      });
  }

  function handleLogin(e) {
    e.preventDefault();
    login(userName, password);
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
    setPassword("");
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user, setUser]);

  return (
    <form className="mt-1" onSubmit={handleLogin}>
      <h3> Login </h3>
      <label> Username: </label>
      <br />
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <br />
      <div>
        <label> Password: </label>
        <br />
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
      <button className="mt-2 btn btn-success" type="submit">
        {" "}
        <FontAwesomeIcon icon={faArrowRightToBracket} /> Log in
      </button>{" "}
      <button className="mt-2 btn btn-outline-primary" onClick={reset}>
        <FontAwesomeIcon icon={faArrowsRotate} />
        Reset
      </button>
      {user && <Navigate to="/" />}
    </form>
  );
}

export default Login;
