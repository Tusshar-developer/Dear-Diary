import React, { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import "./Login.css";
import "./Login-dark.css";
import $ from "jquery";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import db from "../../firebase";
import NavBar from "../NavBar/NavBar.jsx";

function Login() {
  const auth = getAuth();

  useEffect(() => {
    var checkUserSignedIn = async () => {
      var accountId = localStorage.getItem("accountId");
      if (accountId) {
        var userRef = doc(db, `users/`, accountId);
        var user = await getDoc(userRef);
        if (user.exists) {
          window.location.pathname = "/settings";
        }
      }
    };

    checkUserSignedIn();

    document.querySelector(".loginBtn").addEventListener("click", (e) => {
      e.preventDefault();
      signin();
    });
  });

  async function signin() {
    var email = document.querySelector("#login-email").value;
    var password = document.querySelector("#login-password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("accountId", user.uid);
        window.location.pathname = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });

        switch (errorCode) {
          case "auth/wrong-password":
            $(".loginErrorMsg").text("Incorrect Password.");
            break;

          case "auth/invalid-email":
            $(".loginErrorMsg").text("Invalid Email.");
            break;

          case "auth/user-not-found":
            $(".loginErrorMsg").text("User Not Found.");
            break;

          case "auth/user-disabled":
            $(".loginErrorMsg").text("User Disabled.");
            break;

          case "auth/internal-error":
            $(".loginErrorMsg").text("Please try again.");
            break;

          default:
            $(".loginErrorMsg").text("Something went wrong. Try again later.");
            break;
        }
      });
  }

  return (
    <React.Fragment>
      <NavBar />
      <main className="loginForms">
        <div className="loginForm form">
          <form action="#">
            <h1 className="formTitle">Login</h1>
            <div className="field">
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                name="email"
                className="email input"
                placeholder="example@blah.com"
                id="login-email"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                name="password"
                className="password input"
                id="login-password"
                placeholder="123456"
                required
              />
            </div>

            <div className="bottomBar">
              <div className="errorMsg loginErrorMsg"></div>

              <button className="submitBtn loginBtn" type="submit">
                Login
              </button>
            </div>
            <div className="redirectLink">
              New to Dear Diary? Register{" "}
              <a className="registerLink" href="/register">
                here
              </a>
              .
            </div>
          </form>
        </div>
      </main>
    </React.Fragment>
  );
}

export default Login;
