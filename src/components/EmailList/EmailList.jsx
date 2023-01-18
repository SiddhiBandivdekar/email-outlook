import React, { useEffect, useState } from "react";
import "./EmailList.css";
import { selectEmails, setEmails } from "../../store/emailSlice";
import { selectEmailsList, selectEmailsData } from "../../store/emailSlice";
import { fetchEmailBody, fetchEmails } from "../../api/api";
import { useSelector, useDispatch } from "react-redux";
import EmailListItem from "../EmailListItem/EmailListItem";
import { markEmailFavorite, markEmailUnfavorite } from "../../store/emailSlice";
import EmailBody from "../EmailBody/EmailBody";

const EmailList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("unread");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedEmailList, setSelectedEmailList] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [splitView, setSplitView] = useState(false);

  const markFavorite = (id) => dispatch(markEmailFavorite(id));
  const markUnfavorite = (id) => dispatch(markEmailUnfavorite(id));

  const dispatch = useDispatch();
  const emailsList = useSelector(selectEmailsList);
  const emailsData = useSelector(selectEmailsData);

  console.log(emailsList);

  useEffect(() => {
    const fetch = async () => {
      const responseData = await fetchEmails(currentPage);
      dispatch(setEmails(responseData));
    };
    fetch();
  }, [currentPage, dispatch]);

  const filteredEmails = emailsList?.filter((email) => {
    if (filter === "read") {
      return email.isRead;
    } else if (filter === "unread") {
      return !email.isRead;
    } else if (filter === "isFavorite") {
      return email.isFavorite;
    }
    return true;
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSelectedEmail(selectedEmailList);
  };

  let emailList;
  if (filter === "unread") {
    emailList = emailsList;
  } else {
    emailList = filteredEmails;
  }

  const [emailBody, setEmailBody] = useState(null);
  const [isEmailBodyOpen, setIsEmailBodyOpen] = useState(false);

  const handleBodyOpen = (email) => {
    setSplitView(true);
    setIsEmailBodyOpen(!isEmailBodyOpen);
    setSelectedEmail(isEmailBodyOpen ? null : email);
    setSelectedEmailList(isEmailBodyOpen ? null : email);
  };

  useEffect(() => {
    if (!selectedEmail) return;
    const fetch = async () => {
      const body = await fetchEmailBody(selectedEmail.id);
      setEmailBody(body);
    };
    fetch();
  }, [selectedEmail, filter]);

  // console.log(emailBody?.body);

  const handleFavoriteChange = (isFav) => {
    setIsFavorite(isFav);
  };

  // const emailsLength = emailsData.total;
  const filterValues = [
    { label: "Unread", value: "unread" },
    { label: "Read", value: "read" },
    { label: "Favorites", value: "isFavorite" },
  ];
  useEffect(() => {
    if (selectedEmail) {
      setIsFavorite(selectedEmail.isFavorite);
    } else {
      setIsFavorite(false);
    }
  }, [selectedEmail]);

  const emailsLength = emailsData.total || 0;

  const totalPages = Math.ceil(emailsLength / 10);
  const buttons = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <div className="email-list-container">
        <div className="filter-buttons">
          <span>Filter By: </span>

          {filterValues?.map((filterValue) => (
            <button
              key={filterValue.value}
              className={`filter-buttons ${
                filter === filterValue.value ? "selected" : ""
              }`}
              onClick={() => handleFilterChange(filterValue.value)}
            >
              {filterValue.label}
            </button>
          ))}
        </div>

        {filter === "unread"
          ? ""
          : filterValues?.map(
              (fil) =>
                filter === fil.value &&
                !emailList.length > 0 && (
                  <div key={fil.value}>No emails found!</div>
                )
            )}

        {emailList && emailList.length !== 0 && emailList.length > 9 && (
          <div className="pagination-buttons">
            {buttons.map((button) => (
              <button
                key={button}
                className={`page-buttons ${
                  currentPage === button ? "current-page" : ""
                }`}
                onClick={() => setCurrentPage(button)}
              >
                Page {button}
              </button>
            ))}
          </div>
        )}
        <div className="body-list">
          <div
            className={`emailList-items ${
              splitView && isEmailBodyOpen ? "split" : ""
            } `}
          >
            {emailList?.map((email) => (
              <EmailListItem
                key={email.id}
                email={email}
                splitView={splitView}
                handleBodyOpen={handleBodyOpen}
                isFullWidth={
                  (filter === "favorites" || filter === "read") &&
                  !selectedEmail
                }
                isSelected={
                  selectedEmailList ? email.id === selectedEmailList.id : false
                }
                isFavorite={email.isFavorite}
              />
            ))}
          </div>

          {splitView &&
            selectedEmail &&
            (filter === "unread" ||
              filteredEmails?.find(
                (email) => email.id === selectedEmail.id
              )) && (
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
