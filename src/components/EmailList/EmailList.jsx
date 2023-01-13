import React, { useState } from "react";
import "./EmailList.css";
import { setEmails } from "../../store/emailSlice";
import { fetchEmails } from "../../api/api";
import { useSelector, useDispatch } from "react-redux";

const EmailList = () => {
  const [filter, setFilter] = useState("all");

  const emails = useSelector((state) => state.emails);
  const dispatch = useDispatch();

  return (
    <div className="email-list">
      <div className="filter-buttons">
        <span>Filter By: </span>
        <button>Unread</button>
        <button>Read</button>
        <button>Favourites</button>
      </div>
    </div>
  );
};

export default EmailList;
