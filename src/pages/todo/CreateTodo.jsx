import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";

const CreateTodo = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);
  const [todo, setTodo] = useState({
    task: "",
    date: "",
  });
  const { addDocument, response } = useFirestore("todos");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    const todos = {
      createdBy: user.uid,
      task: todo.task,
      date: Timestamp.fromDate(new Date(todo.date)),
    };
    console.log(todos + "inside");
    await addDocument(todos);
    if (!response.error) {
      navigate("/todos");
    }
  };
  return (
    <div className="todo">
      <h2>Add your todos </h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            required
            onChange={(e) => setTodo({ ...todo, task: e.target.value })}
            value={todo.task}
          />
        </label>
        <label>
          <span>Due date:</span>
          <input
            type="date"
            required
            onChange={(e) => setTodo({ ...todo, date: e.target.value })}
            value={todo.date}
          />
        </label>

        <button className="btn">Add to do</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};
export default CreateTodo;
