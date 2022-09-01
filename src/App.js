import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Error404 from "./components/404/404";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";
import Max from "./components/Max/Max";
import New from "./components/New/New";
import Note from "./components/Note/Note";
import Pages from "./components/Pages/Pages";
import Register from "./components/Register/Register";
import Settings from "./components/Settings/Settings";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/new" element={<New />} />
          <Route path="/note/:id" element={<Note />} />
          <Route path="/max" element={<Max />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
