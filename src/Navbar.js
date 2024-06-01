import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Navbar() {
  return (
    <div className="header">
      <div className="logo">
        <h1>BrainyLingo</h1>
      </div>
      <div className="mid">
        <Link to="/">
          <h4>Home</h4>
        </Link>
        <h4>Leaderboard</h4>
        <h4>Daily Quiz</h4>
        <h4>
          <span>Genre</span>
        </h4>
      </div>
      <div>
        <button>Sign out</button>
      </div>
    </div>
  );
}

export default Navbar;
