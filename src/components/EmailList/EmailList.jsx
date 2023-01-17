import React, { useEffect, useState } from "react";
import "./EmailList.css";
import { selectEmails, setEmails, setFilter } from "../../store/emailSlice";
import { fetchEmailBody, fetchEmails } from "../../api/api";
import { useSelector, useDispatch } from "react-redux";
import EmailListItem from "../EmailListItem/EmailListItem";
import {
  markEmailRead,
  markEmailUnread,
  markEmailFavorite,
  markEmailUnfavorite,
} from "../../store/emailSlice";
import EmailBody from "../EmailBody/EmailBody";

const EmailList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("unread");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedEmailList, setSelectedEmailList] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentOpenEmailId, setCurrentOpenEmailId] = useState("");
  const [splitView, setSplitView] = useState(false);

  const markRead = (id) => dispatch(markEmailRead(id));
  const markUnread = (id) => dispatch(markEmailUnread(id));
  const markFavorite = (id) => dispatch(markEmailFavorite(id));
  const markUnfavorite = (id) => dispatch(markEmailUnfavorite(id));

  const dispatch = useDispatch();
  const emails = useSelector(selectEmails);

  useEffect(() => {
    const fetch = async () => {
      const emails = await fetchEmails(currentPage);
      dispatch(setEmails(emails));
    };
    fetch();
  }, [currentPage, dispatch]);

  const filteredEmails = emails.filter((email) => {
    if (filter === "read") {
      return email.isRead;
    } else if (filter === "unread") {
      return !email.isRead;
    } else if (filter === "favorite") {
      return email.isFavorite;
    }
    return true;
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSelectedEmail(null);
    localStorage.setItem("filter", newFilter);
  };

  let emailList;
  if (filter === "all") {
    emailList = emails;
  } else {
    emailList = filteredEmails;
  }

  const handleBodyOpen = (email) => {
    setSplitView(true);
    setSelectedEmail(email);
    setIsOpen(!isOpen);
    // dispatch(markEmailRead(email.id));
    // setCurrentOpenEmailId(email.id);
    setSelectedEmailList(email);
  };

  const [emailBody, setEmailBody] = useState(null);

  useEffect(() => {
    if (!selectedEmail) return;
    const fetch = async () => {
      const body = await fetchEmailBody(selectedEmail.id);
      setEmailBody(body);
    };
    fetch();
  }, [selectedEmail]);

  const handleFavoriteChange = (isFav) => {
    setIsFavorite(isFav);
  };

  return (
    <>
      <div className="emailList_container">
        <div className="filter-buttons">
          <span>Filter By: </span>

          <button
            className={`filter-buttons ${
              filter === "unread" ? "selected" : ""
            }`}
            // onClick={() => setFilter("unread")}
            onClick={() => handleFilterChange("unread")}
          >
            Unread
          </button>
          <button
            className={`filter-buttons ${filter === "read" ? "selected" : ""}`}
            // onClick={() => setFilter("read")}
            onClick={() => handleFilterChange("read")}
          >
            Read
          </button>
          <button
            className={`filter-buttons ${
              filter === "favorites" ? "selected" : ""
            }`}
            // onClick={() => setFilter("favorites")}
            onClick={() => handleFilterChange("favorites")}
          >
            Favourites
          </button>
        </div>

        {emailList && emailList.length !== 0 && (
          <div className="pagination-buttons">
            <button
              className={`page-buttons ${
                currentPage === 1 ? "current-page" : ""
              }`}
              onClick={() => setCurrentPage(1)}
            >
              Page 1
            </button>
            <button
              className={`page-buttons ${
                currentPage === 2 ? "current-page" : ""
              }`}
              onClick={() => setCurrentPage(2)}
            >
              Page 2
            </button>
          </div>
        )}
        <div className="body-list">
          <div className={`emailList-items ${splitView ? "split" : ""}`}>
            {emailList?.map((email) => (
              <EmailListItem
                key={email.id}
                email={email}
                splitView={splitView}
                markAsRead={markRead}
                markAsUnread={markUnread}
                markAsFavorite={markFavorite}
                markAsUnfavorite={markUnfavorite}
                isOpened={email.id === currentOpenEmailId}
                handleBodyOpen={handleBodyOpen}
                isSelected={
                  selectedEmailList ? email.id === selectedEmailList.id : false
                }
                isFavorite={isFavorite}
              />
            ))}
          </div>
          {/* {splitView && currentOpenEmailId === currentOpenEmailId && (
          <div className={`email-body ${splitView ? "split" : ""}`}>
          {selectedEmail && (
            <EmailBody
            handleBodyOpen={handleBodyOpen}
            emailId={currentOpenEmailId}
            markAsFavorite={markFavorite}
            markAsUnfavorite={markUnfavorite}
            />
            )}
            </div>
          )} */}

          {splitView && selectedEmail && (
            <div className="emailList-body split">
              <EmailBody
                emailBody={emailBody}
                email={selectedEmail}
                markAsFavorite={markFavorite}
                markAsUnfavorite={markUnfavorite}
                onFavoriteChange={handleFavoriteChange}
                isFavorite={isFavorite}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailList;
