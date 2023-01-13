import React from "react";
import "./Filtering.css";

const Filtering = () => {
  return (
    <div className="container">
      <div className="left">
        <span>Filter by:</span>
      </div>
      <div className="right">
        <button>Unread</button>
        <button>Read</button>
        <button>Favorites</button>
      </div>
    </div>
  );
};

export default Filtering;
