// styles
import "./Holiday.css";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import HolidaySummary from "./HolidaySummary";
import HolidayComments from "./HolidayComments";

const Holiday = () => {
  const { id } = useParams();
  const { document, error } = useDocument("holidays", id);

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="holiday-details">
      <HolidaySummary holiday={document} />
      <HolidayComments holiday={document} />
    </div>
  );
};

export default Holiday;
