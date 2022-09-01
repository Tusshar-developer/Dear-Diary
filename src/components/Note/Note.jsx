import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import db from "../../firebase";
import "./Note-dark.css";
import "./Note.css";
import $ from "jquery";

function Note() {
  function handleNavToggle() {
    document.querySelector(".navbar2").classList.toggle("active");
    document.querySelector(".navbar2").classList.toggle("inactive");
    document.querySelector(".hamburger2").classList.toggle("active");
  }

  useEffect(() => {
    var accId = localStorage.getItem("accountId");
    if (!accId) {
      window.location.pathname = "/login";
      return;
    }

    document
      .querySelector(".hamburger2")
      .addEventListener("click", handleNavToggle);

    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var d = new Date();
    if (d.getDate().toString().split().includes("1")) {
      $(".date").text(
        `${d.getDate()}st ${months[d.getMonth()]}, ${d.getFullYear()}`
      );
    } else if (d.getDate().toString().split().includes("2")) {
      $(".date").text(
        `${d.getDate()}nd ${months[d.getMonth()]}, ${d.getFullYear()}`
      );
    } else {
      $(".date").text(
        `${d.getDate()}th ${months[d.getMonth()]}, ${d.getFullYear()}`
      );
    }

    const getNote = async () => {
      var id =
        window.location.pathname.split("/")[
          window.location.pathname.split("/").length - 1
        ];
      var noteRef = doc(db, `users/${accId}`);
      var user = (await getDoc(noteRef)).data();
      var { notes } = user;
      var note = notes[id];
      var title = note.title;
      var content = note.content;

      $(".noteTitle").val(title);

      const writingArea = document.querySelector(".writingArea");
      writingArea.value = content;
      document.querySelector(".loader-wrapper").classList.add("loaded");
    };

    getNote();

    //* Auto-saving feature

    var $status = $(".saveStatus"),
      $writingArea = $(".writingArea"),
      $titleBox = $(".noteTitle"),
      timeoutId,
      timeoutId2;

    async function save(userRef, data) {
      setDoc(userRef, data, { merge: true }).then(() => {
        $status.text("saved");
      });
    }

    $writingArea.keydown(() => {
      $status.text("not saved");
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        var newContent = $writingArea.val();
        if (newContent.length > 1500) {
          $status.text(
            "1500 characters is the maximum per page. Please remove some words in order to save your work."
          );
        } else {
          var date = new Date().getTime();

          var id =
            window.location.pathname.split("/")[
              window.location.pathname.split("/").length - 1
            ];
          var userRef = doc(db, `users/${accId}`);
          var data = {
            notes: {},
          };
          data.notes[id] = {
            content: newContent,
            date,
          };
          save(userRef, data);
        }
      }, 750);
    });

    $titleBox.keydown(() => {
      $status.text("not saved");
      if (timeoutId2) clearTimeout(timeoutId2);
      timeoutId2 = setTimeout(() => {
        var title = $titleBox.val();
        if (title.length > 30) {
          $status.text(
            "The title cannot be more than 30 characters. Please take some words out."
          );
        } else {
          var id =
            window.location.pathname.split("/")[
              window.location.pathname.split("/").length - 1
            ];

          var date = new Date().getTime();

          var data = {
            notes: {},
          };
          data.notes[id] = {
            date,
            title,
          };

          var userRef = doc(db, `users/${accId}`);
          save(userRef, data);
        }
      }, 750);
    });
  });

  return (
    <React.Fragment>
      <div className="loader-wrapper fullPage">
        <div className="loader loader-6"></div>
      </div>

      <div className="hamburger2">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <nav className="navbar2 inactive">
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
      <main className="noteMain">
        <section className="titleSection">
          <input
            className="noteTitle"
            type="text"
            name="title"
            id="titleInput"
            placeholder="Untitled Note"
            maxLength={40}
            spellCheck="false"
          />
          <h3 className="date">28th July, 2022</h3>

          <hr className="hr" />
        </section>

        <section className="writingSection">
          <h2 className="dearDiary">Dear Diary,</h2>
          <textarea
            className="writingArea"
            name="writingArea"
            id="writingArea"
            spellCheck="false"
            style={{ maxHeight: "" }}
            maxLength={1500}
          ></textarea>
          <div className="lines"></div>
        </section>

        <div className="saveStatus">Not Saved.</div>
      </main>
    </React.Fragment>
  );
}

export default Note;
