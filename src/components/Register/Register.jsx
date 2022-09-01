import React, { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./Register.css";
import "./Register-dark.css";
import $ from "jquery";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from "../../firebase";
import NavBar from "../NavBar/NavBar.jsx";

function Register() {
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

    document.querySelector(".registerBtn").addEventListener("click", (e) => {
      e.preventDefault();
      register();
    });
  });

  async function createUser(id, email, password) {
    const userRef = doc(db, `users/${id}`);
    var data = {
      email,
      password,
      notes: {},
    };
    await setDoc(userRef, data);
  }

  async function register() {
    var email = document.querySelector("#register-email").value;
    var password = document.querySelector("#register-password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("accountId", user.uid);
        await createUser(user.uid, email, password);
        window.location.pathname = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });

        switch (errorCode) {
          case "auth/email-already-in-use":
            $(".registerErrorMsg").text("Email already registered.");
            break;

          case "auth/invalid-email":
            $(".registerErrorMsg").text("Invalid Email.");
            break;

          case "auth/weak-password":
            $(".registerErrorMsg").text("Password is too weak.");
            break;

          case "auth/internal-error":
            $(".registerErrorMsg").text("Please try again.");
            break;

          default:
            $(".registerErrorMsg").text(
              "Something went wrong. Try again later."
            );
            break;
        }
      });
  }

  return (
    <React.Fragment>
      <NavBar />
      <main className="registerForms">
        <div className="registerForm form">
          <form action="#">
            <h1 className="formTitle">Register</h1>
            <div className="field">
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                name="email"
                className="email input"
                id="register-email"
                placeholder="example@blah.com"
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
                id="register-password"
                placeholder="Must be 8 characters"
                required
              />
            </div>

            <div className="bottomBar">
              <div className="errorMsg registerErrorMsg"></div>

              <button className="submitBtn registerBtn" type="submit">
                Register
              </button>
            </div>
            <div className="redirectLink">
              Already have an account? Login{" "}
              <a className="loginLink" href="/login">
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

export default Register;
