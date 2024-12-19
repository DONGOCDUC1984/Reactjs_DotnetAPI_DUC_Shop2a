import React from "react";
import { Navigate } from "react-router-dom";

function NoMatchPage() {
  return (
    <div>
      <h3>No Match Page</h3>
      <Navigate to="/" />
    </div>
  );
}

export default NoMatchPage;
