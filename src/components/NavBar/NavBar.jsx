import React, { useEffect } from "react";
import "./NavBar.css";
import "./NavBar-dark.css";

function NavBar() {
  function handleNavToggle() {
    document.querySelector(".navbar").classList.toggle("active");
    document.querySelector(".navbar").classList.toggle("inactive");
    document.querySelector(".hamburger").classList.toggle("active");
  }

  useEffect(() => {
    document
      .querySelector(".hamburger")
      .addEventListener("click", handleNavToggle);
  });

  return (
    <header>
      <div className="hamburger">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <nav className="navbar inactive">
        <a href="/" className="navLink">
          Home
        </a>
        <a href="/about" className="navLink">
          About
        </a>
        <a href="/new" className="navLink">
          New note
        </a>
        <a href="/settings" className="navLink">
          Settings
        </a>
      </nav>

      <h1 className="title">
        Dear Diar<span className="lastLetter">y</span>
      </h1>
    </header>
  );
}

export default NavBar;
