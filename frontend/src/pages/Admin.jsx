import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { CommonContext } from "../components/UCProvider";

function Admin() {
  var { user } = useContext(CommonContext);
  var navigate = useNavigate();

  return (
    <div>
      <h3>ADMINISTRATION PAGE </h3>
      <button
        onClick={() => {
          navigate("/addupdateproduct");
        }}
      >
        Change to Create Product page
      </button>
      <br /> <br />
      <button
        onClick={() => {
          navigate("/orders");
        }}
      >
        Change to Orders page
      </button>
      <br /> <br />
      {(!user || user.Role !== "Admin") && <Navigate to="/" />}
    </div>
  );
}

export default Admin;
