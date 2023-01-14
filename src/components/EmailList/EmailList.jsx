import React, { useEffect, useState } from "react";
import "./EmailList.css";
import { setEmails } from "../../store/emailSlice";
import { fetchEmails } from "../../api/api";
import { useSelector, useDispatch } from "react-redux";
import EmailListItem from "../EmailListItem/EmailListItem";
import {
  markEmailRead,
  markEmailUnread,
  markEmailFavorite,
  markEmailUnfavorite,
} from "../../store/emailSlice";

const EmailList = () => {
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const emails = useSelector((state) => state.emails);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const emails = await fetchEmails(currentPage);
      dispatch(setEmails(emails));
    };
    fetch();
  }, [currentPage, dispatch]);
  npmnp;

  const filteredEmails = emails.filter((email) => {
    if (filter === "read") {
      return email.read;
    } else if (filter === "unread") {
      return !email.read;
    } else if (filter === "favorite") {
      return email.favorite;
    } else {
      return true;
    }
  });

  const markRead = (id) => dispatch(markEmailRead(id));
  const markUnread = (id) => dispatch(markEmailUnread(id));
  const markFavorite = (id) => dispatch(markEmailFavorite(id));
  const markUnfavorite = (id) => dispatch(markEmailUnfavorite(id));

  return (
    <div className="email-list">
      <div className="filter-buttons">
        <span>Filter By: </span>

        <button
          className={`filter-buttons ${filter === "unread" ? "selected" : ""}`}
          onClick={() => setFilter("unread")}
        >
          Unread
        </button>
        <button
          className={`filter-buttons ${filter === "read" ? "selected" : ""}`}
          onClick={() => setFilter("read")}
        >
          Read
        </button>
        <button
          className={`filter-buttons ${
            filter === "favorites" ? "selected" : ""
          }`}
          onClick={() => setFilter("favorites")}
        >
          Favourites
        </button>
      </div>

      <div className="pagination-buttons">
        <button className="page-buttons" onClick={() => setCurrentPage(1)}>
          Page 1
        </button>
        <button className="page-buttons" onClick={() => setCurrentPage(2)}>
          Page 2
        </button>
      </div>
      {filteredEmails.map((email) => (
        <EmailListItem
          key={email.id}
          email={email}
          markAsRead={markRead}
          markAsUnread={markUnread}
          markAsFavorite={markFavorite}
          markAsUnfavorite={markUnfavorite}
          onClick={() => dispatch(toggleRead(email.id))}
          onFavoriteClick={() => dispatch(toggleFavorite(email.id))}
        />
      ))}
    </div>
  );
};

export default EmailList;
