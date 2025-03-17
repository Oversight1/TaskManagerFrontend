import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; 


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOption, setSortOption] = useState("priority");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get(`${API_URL}/tasks`)
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  };

const handleTaskAdded = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`); // Fetch updated task list
    setTasks(response.data); // Update UI with new tasks
  } catch (error) {
    console.error("Error fetching updated tasks:", error);
  }
};
    
  const toggleTaskCompletion = (id) => {
    const task = tasks.find(task => task._id === id);
    if (!task) return;

    axios.patch(`${API_URL}/tasks/${id}`, { completed: !task.completed })
      .then(() => fetchTasks()) // Refresh list after update
      .catch(error => console.error("Error updating task:", error));
  };

  const handleDeleteTask = (id) => {
    axios.delete(`${API_URL}/tasks/${id}`)
      .then(() => fetchTasks()) // Refresh after delete
      .catch(error => console.error("Error deleting task:", error));
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  // Sort tasks by priority
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
    
  const mongoose = require("mongoose");
    
  const TaskSchema = new mongoose.Schema({
      title: { type: String, required: true },
      priority: { type: String, enum: ["High", "Medium", "Low"], required: true },
      completed: { type: Boolean, default: false },
      dueDate: { type: Date } // ✅ New dueDate field
  });

//  return (
//    <div className="container mt-4">
//      <h2 className="text-center">Task List</h2>
//      <TaskForm onTaskAdded={handleTaskAdded} />
//
//      {/* Filter and Sorting Options */}
//      <div className="d-flex justify-content-between mb-3">
//        <div>
//          <label className="me-2">Filter:</label>
//          <select className="form-select d-inline w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
//            <option value="all">All Tasks</option>
//            <option value="completed">Completed</option>
//            <option value="incomplete">Incomplete</option>
//          </select>
//        </div>
//        <div>
//          <label className="me-2">Sort by:</label>
//          <select className="form-select d-inline w-auto" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
//            <option value="priority">Priority</option>
//          </select>
//        </div>
//      </div>
//
//      {/* Task Cards */}
//      <div className="row">
//        {sortedTasks.map(task => (
//          <div key={task._id} className="col-md-4 mb-3">
//            <div className={`card shadow ${task.completed ? "bg-light" : ""}`}>
//              <div className="card-body">
//                <h5 className="card-title">{task.title}</h5>
//                <p className="card-text">
//                  <strong>Priority:</strong> {task.priority}
//                </p>
//                <div className="d-flex justify-content-between">
//                  <button 
//                    className={`btn ${task.completed ? "btn-secondary" : "btn-success"}`} 
//                    onClick={() => toggleTaskCompletion(task._id)}
//                  >
//                    {task.completed ? "Undo" : "Complete"}
//                  </button>
//                  <button 
//                    className="btn btn-danger" 
//                    onClick={() => handleDeleteTask(task._id)}
//                  >
//                    Delete ❌
//                  </button>
//
//                </div>
//              </div>
//            </div>
//          </div>
//        ))}
//      </div>
//    </div>
//  );
//};
return (
  <div className="container mt-4">
    <h2 className="text-center">Task List</h2>
    <TaskForm onTaskAdded={handleTaskAdded} />

    {/* Filter and Sorting Options */}
    <div className="d-flex justify-content-between mb-3">
      <div>
        <label className="me-2">Filter:</label>
        <select className="form-select d-inline w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <div>
        <label className="me-2">Sort by:</label>
        <select className="form-select d-inline w-auto" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option> {/* ✅ Added Sorting by Due Date */}
        </select>
      </div>
    </div>

    {/* Task Cards */}
    <div className="row">
      {sortedTasks.map(task => {
        const dueDate = task.dueDate ? new Date(task.dueDate) : null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let dueText = "No Due Date";
        let dueColor = "text-muted";

        if (dueDate) {
          const diff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

          if (diff < 0) {
            dueText = `Overdue by ${Math.abs(diff)} days`;
            dueColor = "text-danger fw-bold";
          } else if (diff === 0) {
            dueText = "Due Today!";
            dueColor = "text-warning fw-bold";
          } else {
            dueText = `Due in ${diff} days`;
            dueColor = "text-success fw-bold";
          }
        }

        return (
          <div key={task._id} className="col-md-4 mb-3">
            <div className={`card shadow ${task.completed ? "bg-light" : ""}`}>
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">
                  <strong>Priority:</strong> {task.priority}
                </p>
                <p className={`card-text ${dueColor}`}>
                  <strong>{dueText}</strong>
                </p>
                <div className="d-flex justify-content-between">
                  <button 
                    className={`btn ${task.completed ? "btn-secondary" : "btn-success"}`} 
                    onClick={() => toggleTaskCompletion(task._id)}
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete ❌
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
};

export default TaskList;
