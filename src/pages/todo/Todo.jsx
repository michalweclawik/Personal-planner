import React from "react";
import "./Todo.css";
import { useFirestore } from "../../hooks/useFirestore";

const Todo = ({ todos }) => {
  const { deleteDocument } = useFirestore("todos");
  const handleClick = (id) => {
    deleteDocument(id);
  };
  return (
    <div className="todolist">
      {todos.length === 0 && <p>No todos yet!</p>}

      {todos.map((todo) => (
        <div className="todo" key={todo.id}>
          <h3>{todo.task}</h3>
          <h4>{todo.date.toDate().toDateString()}</h4>
          <button className="btn" onClick={() => handleClick(todo.id)}>
            DELETE
          </button>
        </div>
      ))}
    </div>
  );
};

export default Todo;
