import "./TodoList.css";

import { useAuthContext } from "../../hooks/useAuthContext";

import React from "react";
import CreateTodo from "./CreateTodo";
import { useCollection } from "../../hooks/useCollection";
import Todo from "./Todo";

const TodoList = () => {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("todos");

  const todos = documents
    ? documents.filter((document) => {
        if (document.createdBy == user.uid) return true;
      })
    : null;

  return (
    <div>
      {todos && <Todo todos={todos} />}
      <CreateTodo uid={user.uid} />
    </div>
  );
};

export default TodoList;
