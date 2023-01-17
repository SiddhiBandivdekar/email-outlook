import React, { useState } from "react";
import "./EmailListItem.css";
import { useDispatch } from "react-redux";
import { markEmailRead, setSelectedEmailId } from "../../store/emailSlice";

const formatDate = (date) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-GB", options).format(new Date(date));
};

const EmailListItem = ({
  email,
  splitView,
  isFavorite,
  isSelected,
  handleBodyOpen,
}) => {
  const formattedDate = formatDate(email.date);
  const dispatch = useDispatch();

  const [isRead, setIsRead] = useState(email.isRead);

  const handleClick = () => {
    handleBodyOpen(email);

    if (!isRead) {
      setIsRead(true);
      dispatch(markEmailRead(email.id));
    }
  };

  return (
    <>
      <div className="page">
        <div className="email-container">
          <div
            className={`email-list-page ${isSelected ? "selected" : ""}`}
            onClick={handleClick}
          >
            <div className="email-item-avatar">
              {email.from.name[0].toUpperCase()}
            </div>
            <div className="email-item-content">
              <div className="email-item-from">
                <span>From:</span>
                <div className="from-name text">{email.from.name}</div>
                <div className="from-email text">{`<${email.from.email}>`}</div>
              </div>
              <div className="email-item-subject">
                <span>Subject:</span>
                <span className="text"> {email.subject}</span>
              </div>
              <div className="email-item-desc">
                {splitView
                  ? email.short_description.substring(0, 40) + "..."
                  : email.short_description}
              </div>
              <div className="email-item-information">
                <div className="email-item-date">{formattedDate}</div>

                {isFavorite && <div className="email-item-fav">Favorite</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailListItem;
