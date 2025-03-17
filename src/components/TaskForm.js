import React, { useState } from "react";
import axios from "axios";

//API connection between the frontend-backend
const API_URL = "https://taskmanager-sbj4.onrender.com";
//"http://localhost:5000"
const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await axios.post(`${API_URL}/tasks`, { title, priority, dueDate });
      setTitle("");
      setDueDate(""); //Clears the input
      onTaskAdded();
    } catch (error) {
      console.error("❌ Error adding task:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add a Task</h2>
      <form onSubmit={handleSubmit} className="p-3 shadow bg-white rounded">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <select 
            className="form-select"
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <input
            type = "date"
            value = {dueDate}
            onChange = {(e) => setDueDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
