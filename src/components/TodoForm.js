import React, { useState } from "react";

import { db } from "./utils/firebase";
import { ref, push, set } from "firebase/database";

const TodoForm = () => {
  const [taskName, setTaskname] = useState("");

  const createTodo = async (e) => {
    e.preventDefault();

    try {
      const todoRef = ref(db, "todos");
      const newPostRef = push(todoRef);
      set(newPostRef, {
        taskName,
        complete: false,
      });
    } catch (err) {
      console.error("Error adding document: ", err);
    }
    setTaskname("");
  };
  const handleChange = (e) => {
    setTaskname(e.target.value);
  };

  return (
    <form onSubmit={createTodo}>
      <div className="card">
        <div className="card-body">
          <p className="card-text">
            <label htmlFor="inputTodo" className="card-title form-label">
              Todo Sht
            </label>
          </p>
          <div className="row">
            <div className="col-10">
              <input
                id="inputTodo"
                className="form-control"
                type="text"
                placeholder="Input todo"
                value={taskName}
                onChange={handleChange}
              />
            </div>
            <div className="col-2">
              <button className="btn btn-primary" type="submit">
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
