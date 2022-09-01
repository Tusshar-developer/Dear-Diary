import React from "react";
import NavBar from "../NavBar/NavBar";
import "./About.css";
import "./About-dark.css";

function About() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="about">
        <p>
          Dear Diary is a project made by Tusshar Luthra. It serves the purpose
          of allowing people to write their diary/journal entries online and for
          free.
        </p>
      </main>
    </React.Fragment>
  );
}

export default About;
