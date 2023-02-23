import { Link } from "react-router-dom";
import "./HolidayList.css";
import Avatar from "./Avatar";

export default function ProjectList({ holidays }) {
  return (
    <div className="holiday-list">
      {holidays.length === 0 && <p>No holidays yet!</p>}
      {holidays.map((holiday) => (
        <Link to={`/holidays/${holiday.id}`} key={holiday.id}>
          <h4>{holiday.name}</h4>
          <p> Start from : {holiday.startDate.toDate().toDateString()}</p>
          <p> Finishing on : {holiday.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <ul>
              {holiday.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}
