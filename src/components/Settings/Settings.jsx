import React from "react";
import { useEffect } from "react";
import NavBar from "../NavBar/NavBar.jsx";
import "./Settings-dark.css";
import "./Settings.css";

function Settings() {
  useEffect(() => {
    if (!localStorage.getItem("accountId")) {
      window.location.pathname = "/login";
      return;
    }
  });

  function lightTheme() {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }

  function darkTheme() {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }

  function apply() {
    var r = document.querySelector(":root");

    var mainFont = "",
      secondaryFont = "";

    if (document.querySelector(".montMain").checked) {
      r.style.setProperty("--main-font", '"Montserrat", sans-serif');
      mainFont = '"Montserrat", sans-serif';
    } else if (document.querySelector(".circMain").checked) {
      r.style.setProperty("--main-font", '"circular", sans-serif');
      mainFont = '"circular", sans-serif';
    } else {
      r.style.setProperty("--main-font", '"Raleway", sans-serif');
      mainFont = '"Raleway", sans-serif';
    }

    localStorage.setItem("mainFont", mainFont);

    if (document.querySelector(".raleSecondary").checked) {
      r.style.setProperty("--secondary-font", '"Raleway", sans-serif');
      secondaryFont = '"Raleway", sans-serif';
    } else if (document.querySelector(".roundSecondary").checked) {
      r.style.setProperty("--secondary-font", '"roundhand", cursive');
      secondaryFont = '"roundhand", cursive';
    } else {
      r.style.setProperty("--secondary-font", '"Dancing Script", cursive');
      secondaryFont = '"Dancing Script", cursive';
    }

    localStorage.setItem("secondaryFont", secondaryFont);
  }

  function signOut() {
    localStorage.removeItem("accountId");
    window.location.pathname = "/login";
  }

  return (
    <React.Fragment>
      <NavBar />
      <main className="settings">
        <p className="settingsPageTitle">Settings</p>
        <section className="settingsSection align-center">
          <h3 className="sectionTitle">Theme</h3>
          <div className="options">
            <button onClick={lightTheme} className="light theme">
              Light
            </button>
            <button onClick={darkTheme} className="dark theme">
              Dark
            </button>
          </div>
        </section>

        <div className="separator"></div>

        <section className="settingsSection">
          <h3 className="sectionTitle">Main font</h3>
          <div className="mainFonts">
            <fieldset id="mainFont">
              <div className="option">
                <label className="rale" htmlFor="raleway">
                  Raleway (default)
                </label>
                <input
                  type="radio"
                  name="mainFont"
                  id="raleway"
                  className="raleMain"
                  defaultChecked
                />
              </div>
              <div className="option">
                <label className="circ" htmlFor="circular">
                  Circular
                </label>
                <input
                  type="radio"
                  name="mainFont"
                  id="circular"
                  className="circMain"
                />
              </div>
              <div className="option">
                <label className="mont" htmlFor="mont">
                  Montserrat
                </label>
                <input
                  type="radio"
                  name="mainFont"
                  id="mont"
                  className="montMain"
                />
              </div>
            </fieldset>
          </div>
        </section>

        <div className="separator"></div>

        <section className="settingsSection">
          <h3 className="sectionTitle">Secondary font</h3>
          <div className="mainFonts">
            <fieldset id="secondaryFont">
              <div className="option">
                <label className="danc" htmlFor="danc">
                  Dancing Script (default)
                </label>
                <input
                  type="radio"
                  name="secondaryFont"
                  id="danc"
                  className="dancSecondary"
                  defaultChecked
                />
              </div>
              <div className="option">
                <label className="rale" htmlFor="rale">
                  Raleway
                </label>
                <input
                  type="radio"
                  name="secondaryFont"
                  id="rale"
                  className="raleSecondary"
                />
              </div>
              <div className="option">
                <label className="round" htmlFor="round">
                  Roundhand
                </label>
                <input
                  type="radio"
                  name="secondaryFont"
                  id="round"
                  className="roundSecondary"
                />
              </div>
            </fieldset>
          </div>
        </section>

        <button onClick={apply} className="apply">
          Apply
        </button>

        <section className="settingsSection">
          <button onClick={signOut} className="dangerBtn">
            Sign out
          </button>
        </section>
      </main>
    </React.Fragment>
  );
}

export default Settings;
