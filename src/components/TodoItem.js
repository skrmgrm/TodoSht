import React, { useState, useEffect } from "react";

import { db } from "./utils/firebase";
import { ref, set } from "firebase/database";

const TodoItem = (props) => {
  const [updateTodo, setUpdateTodo] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const onComplete = () => {
    setIsComplete((prev) => !prev);
    set(ref(db, "todos/" + props.id), {
      taskName: props.taskName,
      complete: !isComplete,
    });
  };

  const onDelete = () => {
    props.onDelete(props.id);
  };

  const onUpdateHandler = () => {
    setIsUpdate((prev) => !prev);
    setUpdateTodo("");
  };

  const updateTodoHandler = (e) => {
    e.preventDefault();
    set(ref(db, "todos/" + props.id), {
      taskName: updateTodo,
      onComplete: isComplete,
    });
    setUpdateTodo("");
    setIsUpdate(false);
  };

  const updateChangeHandler = (e) => {
    setUpdateTodo(e.currentTarget.value);
  };

  useEffect(() => {
    setIsComplete(props.complete);
  }, [props.complete]);

  return (
    <li className={`list-group-item ${isComplete && "text-white bg-success"}`}>
      <div className="row">
        <div className="col-7">{props.taskName}</div>
        <div className="col-5">
          <button
            className={`btn btn-success ${isUpdate && "disabled"}`}
            onClick={onComplete}
          >
            <i className="bi bi-check-lg text-white"></i>
          </button>
          <button
            className={`btn btn-warning ms-1 ${isComplete && "disabled"}`}
            onClick={onUpdateHandler}
          >
            <i className="bi bi-pencil-square text-white"></i>
          </button>
          <button className="btn btn-danger ms-1" onClick={onDelete}>
            <i className="bi bi-x text-white"></i>
          </button>
        </div>
      </div>
      {isUpdate && (
        <form onSubmit={updateTodoHandler}>
          <div className="mt-3">
            <input
              className="form-control"
              placeholder="Update todo"
              type="text"
              value={updateTodo}
              onChange={updateChangeHandler}
            />
          </div>
        </form>
      )}
    </li>
  );
};

export default TodoItem;
