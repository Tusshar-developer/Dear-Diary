import React, { useEffect } from "react";
import "./New.css";
import "./Loader.css";
import "./Loader-dark.css";

import db from "../../firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

function New() {
  useEffect(() => {
    if (!localStorage.getItem("accountId")) {
      window.location.pathname = "/login";
      return;
    }

    const makeNote = async () => {
      var accId = localStorage.getItem("accountId");
      var accRef = doc(db, `users/${accId}`);
      var acc = (await getDoc(accRef)).data();
      if (Object.keys(acc.notes) >= 240) {
        window.location.pathname = "/max";
      }

      var date = new Date().getTime();

      var randId = new Date().getTime().toString(36);
      var data = {
        notes: {},
      };
      data.notes[randId] = {
        content: "",
        date,
      };

      setDoc(accRef, data, { merge: true })
        .then(() => {
          window.location.pathname = `/note/${randId}`;
        })
        .catch(console.error);
    };

    makeNote();
  }, []);

  return (
    <React.Fragment>
      <main className="loading">
        <div className="loader-wrapper">
          <div className="loader loader-6"></div>
        </div>

        <p className="message">Opening a new page</p>
      </main>
    </React.Fragment>
  );
}

export default New;
