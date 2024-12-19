import React, { useState, useEffect } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { environment } from "../services/Environment";
import authHeader from "../services/auth-header";

function UserProfile() {
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    function getUserProfile() {
      Axios.get(environment.baseUrlAPI + "/authenticate/userprofile", {
        headers: authHeader(),
      })
        .then((res) => {
          //console.log("UserProfile: " + JSON.stringify(res.data));
          setUserDetails(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getUserProfile();
  }, [setUserDetails]);

  return (
    <div className="container mt-1">
      <br />
      <h3>
        <FontAwesomeIcon icon={faUserCircle} /> User's Profile
      </h3>
      <p>
        <b> UserName:</b> {userDetails.userName}{" "}
      </p>
      <p>
        <b> Email:</b> {userDetails.email}{" "}
      </p>
      <hr />
    </div>
  );
}

export default UserProfile;
