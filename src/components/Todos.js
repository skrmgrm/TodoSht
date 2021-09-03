import React, { useState, useEffect, useCallback } from "react";
import TodoItem from "./TodoItem";

import { db } from "./utils/firebase";
import { ref, onValue, set } from "firebase/database";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(() => {
    try {
      const dbRef = ref(db, "todos");

      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();

        const loadedTodos = [];

        for (const key in data) {
          loadedTodos.push({
            id: key,
            taskName: data[key].taskName,
            complete: data[key].complete,
          });
        }

        setTodos(loadedTodos);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const onDeleteHandler = (key) => {
    set(ref(db, "todos/" + key), null);
  };

  return (
    <ul className="list-group card mt-4">
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            complete={todo.complete}
            id={todo.id}
            taskName={todo.taskName}
            onDelete={onDeleteHandler}
          />
        );
      })}
    </ul>
  );
};

export default Todos;
