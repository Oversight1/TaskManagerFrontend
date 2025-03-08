import React from "react";
import TaskList from "./components/TaskList"; 

const API_URL = "https://taskmanager-sbj4.onrender.com"; // Use your actual backend URL



function App() {
  return (
    <div>
      <h1>Smart Task Manager</h1>
      <TaskList />
    </div>
  );
}

export default App;