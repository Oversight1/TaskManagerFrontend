import React from "react";
import TaskList from "./components/TaskList"; 

const API_URL = "https://your-app.onrender.com"; // Replace with your backend URL


function App() {
  return (
    <div>
      <h1>Smart Task Manager</h1>
      <TaskList />
    </div>
  );
}

export default App;