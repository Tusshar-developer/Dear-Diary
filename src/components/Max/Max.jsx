import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Max.css";

function Max() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="max">
        <h1>Your diary is now full. Wanna get a new one? </h1>
        <a href="/settings" className="newAccLink">
          Sign out and create a new account.
        </a>
      </div>
    </React.Fragment>
  );
}

export default Max;
