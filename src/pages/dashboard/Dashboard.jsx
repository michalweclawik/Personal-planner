// styles
import "./Dashboard.css";
import { useCollection } from "../../hooks/useCollection";
import HolidayList from "../../components/HolidayList";
import HolidaysFilters from "./HolidaysFilters";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Dashboard() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("holidays");
  const [filter, setFilter] = useState("all");

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  let filteredHolidays = documents
    ? documents.filter((document) => {
        let assignedToMe = false;
        document.assignedUsersList.forEach((u) => {
          if (u.id === user.uid) {
            assignedToMe = true;
          }
        });
        return assignedToMe;
      })
    : null;

  const holidays = filteredHolidays
    ? filteredHolidays.filter((document) => {
        switch (filter) {
          case "all":
            return true;
          case "mine":
            return document.createdBy.id === user.uid;
          case "just planning":
          case "already booked":
            console.log(document.category, filter);
            return document.category === filter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <HolidaysFilters changeFilter={changeFilter} />}
      {holidays && <HolidayList holidays={holidays} />}
    </div>
  );
}
