import React from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="container wrapper d-flex flex-column justify-content-center align-items-center">
      <TodoForm />
      <Todos />
    </div>
  );
}

export default App;
