import React, { useEffect, useState } from "react";
import "./EmailList.css";
import { setEmails } from "../../store/emailSlice";
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
  const [emailBody, setEmailBody] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [splitView, setSplitView] = useState(false);

  const markFavorite = (id) => dispatch(markEmailFavorite(id));
  const markUnfavorite = (id) => dispatch(markEmailUnfavorite(id));

  const dispatch = useDispatch();
  const emailsListData = useSelector(selectEmailsList);
  const emailsData = useSelector(selectEmailsData);

  // console.log(emailsListData);

  // console.log(emailsList);

  useEffect(() => {
    const fetch = async () => {
      const responseData = await fetchEmails(currentPage);
      dispatch(setEmails(responseData));
    };
    fetch();
  }, [currentPage, dispatch]);

  const filteredEmails = emailsListData?.filter((email) => {
    if (filter === "read") {
      return email.isRead;
    } else if (filter === "unread") {
      return !email.isRead;
    } else if (filter === "isFavorite") {
      return email.isFavorite;
    }

    return false;
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSelectedEmail(selectedEmailList);
    setSplitView(false);
    setSelectedEmailList(null);
  };

  let emailList;
  if (filter === "unread") {
    emailList = emailsListData;
  } else {
    emailList = filteredEmails;
  }
  console.log(emailList);
  emailList = emailList.filter((email, index) => {
    console.log(index, currentPage);
    return index / 10 < currentPage && index / 10 >= currentPage - 1;
  });
  console.log(emailList);

  const handleBodyOpen = (email) => {
    setSplitView(true);
    setSelectedEmail(email);
    setSelectedEmailList(email);
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

  const handlePageClick = (button) => {
    setCurrentPage(button);
    setSplitView(false);
  };

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

  const emailsLength =
    filter === "unread" ? emailsData.total || 0 : emailList.length;

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
                  <div key={fil.value} className="no-emailList">
                    No emails found!
                  </div>
                )
            )}

        {emailList && buttons.length > 1 && (
          <div className="pagination-buttons">
            {buttons.map((button) => (
              <button
                key={button}
                className={`page-buttons ${
                  currentPage === button ? "current-page" : ""
                }`}
                onClick={() => handlePageClick(button)}
              >
                Page {button}
              </button>
            ))}
          </div>
        )}
        <div className="body-list">
          <div className={`emailList-items ${splitView ? "split" : ""} `}>
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
