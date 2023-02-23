import { useState } from "react";
const filteredList = ["all", "mine", "just planning", "already booked"];

const HolidaysFilters = ({ changeFilter }) => {
  const [currentFilter, setCurrentFilter] = useState("all");

  const handleClick = (newFilter) => {
    setCurrentFilter(newFilter);
    changeFilter(newFilter);
  };
  return (
    <div className="holiday-filter">
      <p>Filter BY: </p>
      <nav>
        {filteredList.map((filter) => (
          <button
            key={filter}
            onClick={() => handleClick(filter)}
            className={currentFilter === filter ? "active" : ""}
          >
            {filter}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default HolidaysFilters;
