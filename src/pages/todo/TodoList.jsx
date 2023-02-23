import "./TodoList.css";

import { useAuthContext } from "../../hooks/useAuthContext";

import React from "react";
import CreateTodo from "./CreateTodo";

const TodoList = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <CreateTodo uid={user.uid} />
    </div>
  );
};

export default TodoList;
