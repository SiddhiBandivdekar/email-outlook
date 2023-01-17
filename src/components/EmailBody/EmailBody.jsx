import React, { useEffect, useState } from "react";
import { fetchEmailBody } from "../../api/api";
import "./EmailBody.css";

const EmailBody = ({
  email,
  markAsFavorite,
  markAsUnfavorite,
  emailBody,
  onFavoriteChange,
  isFavorite,
  avatar,
  subject,
  date,
}) => {
  const [selectedEmail, setselectedEmail] = useState(null);
  useEffect(() => {
    if (email.id) {
      fetchEmailBody(email.id).then((email) => {
        setselectedEmail(email);
      });
    }
  }, [email.id, fetchEmailBody]);

  const handleMarkAsFavorite = () => {
    isFavorite ? markAsUnfavorite(email.id) : markAsFavorite(email.id);
    onFavoriteChange(!isFavorite);
  };

  if (!emailBody) {
    return <div>Loading...</div>;
  }

  return (
    <div className="email-body-list">
      <div className="header">
        <div className="avatar">{email.from.name[0].toUpperCase()}</div>
        <h1>Lorem Ispum</h1>
        <button className="body-btns" onClick={handleMarkAsFavorite}>
          {isFavorite ? "Unmark as Favorite" : "Mark as Favorite"}
        </button>
      </div>
      <div className="date">26/02/2020, 08:35 pm</div>
      <div
        className="body"
        dangerouslySetInnerHTML={{ __html: selectedEmail?.body }}
      ></div>
    </div>
  );
};

export default EmailBody;
