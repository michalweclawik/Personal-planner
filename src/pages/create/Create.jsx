import { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Timestamp } from "firebase/firestore";
import Select from "react-select";
import { useFirestore } from "../../hooks/useFirestore";

// styles
import "./Create.css";
import { useNavigate } from "react-router-dom";

const categories = [
  { value: "just planning", label: "Just planning" },
  { value: "already booked", label: "Already booked" },
];

export default function Create() {
  const { user } = useAuthContext();
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);

  // form field values
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);
  const { addDocument, response } = useFirestore("holidays");
  const navigate = useNavigate();

  // create user values for react-select
  useEffect(() => {
    if (documents) {
      setUsers(
        documents.map((user) => {
          return { value: { ...user, id: user.id }, label: user.displayName };
        })
      );
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("Please select a project category.");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("Please assign the project to at least 1 user");
      return;
    }

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const holiday = {
      name,
      details,
      category: category.value,
      startDate: Timestamp.fromDate(new Date(startDate)),
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      assignedUsersList,
      createdBy,
      comments: [],
    };

    await addDocument(holiday);

    if (!response.error) {
      navigate("/");
    }
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Book new holiday</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Holiday name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Holiday Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
          />
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>

        <label>
          <span>Holiday status</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>

        <button className="btn">Add Holiday</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
