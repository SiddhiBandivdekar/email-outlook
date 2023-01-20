import "./EmailBody.css";

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

const EmailBody = ({
  email,
  emailBody,
  markAsFavorite,
  markAsUnfavorite,
  onFavoriteChange,
  isFavorite,
}) => {
  const formattedDate = formatDate(email.date);

  const handleMarkAsFavorite = () => {
    isFavorite ? markAsUnfavorite(email.id) : markAsFavorite(email.id);
    onFavoriteChange(!isFavorite);
  };

  // if (!emailBody) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {!emailBody || email.id !== emailBody.id ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="email-body-list">
          <div className="header">
            <div className="avatar">{email.from.name[0].toUpperCase()}</div>
            <h1>{email.subject}</h1>
            <button className="body-btns" onClick={handleMarkAsFavorite}>
              {isFavorite ? "Unmark as Favorite" : "Mark as Favorite"}
            </button>
          </div>
          <div className="date">{formattedDate}</div>
          <div
            className="body"
            dangerouslySetInnerHTML={{ __html: emailBody?.body }}
          ></div>
        </div>
      )}
    </>
  );
};

export default EmailBody;
