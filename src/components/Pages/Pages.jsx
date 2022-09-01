import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import db from "../../firebase";
import NavBar from "../NavBar/NavBar";
import "./Pages-dark.css";
import "./Pages.css";

function Pages() {
  useEffect(() => {
    if (!localStorage.getItem("accountId")) {
      window.location.pathname = "/login";
      return;
    }

    const getNotes = async () => {
      var accId = localStorage.getItem("accountId");
      var accRef = doc(db, "users", accId);
      var acc = (await getDoc(accRef)).data();
      var { notes } = acc;

      var notesArr = [];

      Object.keys(notes).forEach((value) => {
        var data = {
          ...notes[value],
          id: value,
        };
        notesArr.push(data);
      });

      var ordered = notesArr.sort((a, b) => {
        return b.date - a.date;
      });

      ordered.forEach((note) => {
        var title = note.title || "Untitled Note";
        var d = new Date(note.date);
        var lastEdited = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

        const pagesDOM = document.querySelector(".pages");

        var pageDiv = document.createElement("div");
        pageDiv.classList.add("page");

        var titleh3 = document.createElement("h3");
        titleh3.classList.add("pageTitle");
        titleh3.textContent = title;

        var lastEditDOM = document.createElement("p");
        lastEditDOM.classList.add("lastEdited");
        lastEditDOM.textContent = lastEdited;

        pagesDOM.appendChild(pageDiv);
        pageDiv.appendChild(titleh3);
        pageDiv.appendChild(lastEditDOM);

        pageDiv.addEventListener("click", (e) => {
          e.preventDefault();
          window.location.pathname = `/note/${note.id}`;
        });
      });
      document.querySelector(".loader-wrapper").classList.add("loaded");
    };

    getNotes();
  });

  return (
    <React.Fragment>
      <NavBar />
      <div className="loader-wrapper fullPage">
        <div className="loader loader-6"></div>
      </div>
      <div className="labels">
        <p className="label">Title</p>
        <p className="label">Last Modified &#8593;</p>
      </div>
      <main className="pages"></main>
    </React.Fragment>
  );
}

export default Pages;
