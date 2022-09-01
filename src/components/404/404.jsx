import React from "react";
import NavBar from "../NavBar/NavBar";
import "./404.css";

function Error404() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="error404">
        <h2>Error 404</h2>
        Page Not Found.
      </div>
    </React.Fragment>
  );
}

export default Error404;
