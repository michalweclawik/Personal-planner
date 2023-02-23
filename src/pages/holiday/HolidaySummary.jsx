import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

const HolidaySummary = ({ holiday }) => {
  const { deleteDocument } = useFirestore("holidays");
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const handleClick = (e) => {
    deleteDocument(holiday.id);
    navigate("/");
  };

  return (
    <div>
      <div className="holiday-summary">
        <h2 className="page-title">{holiday.name}</h2>
        <p>By: {holiday.createdBy.displayName}</p>
        <p className="due-date">
          Holiday start on : {holiday.startDate.toDate().toDateString()}
        </p>
        <p className="due-date">
          Holiday finish on : {holiday.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{holiday.details}</p>
        <h4>Assigned people</h4>
        <div className="assigned-users">
          {holiday.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === holiday.createdBy.id && (
        <button className="btn" onClick={handleClick}>
          Delete
        </button>
      )}
    </div>
  );
};

export default HolidaySummary;
