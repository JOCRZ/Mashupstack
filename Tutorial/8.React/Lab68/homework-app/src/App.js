import { useState } from 'react';
import './App.css';
import TaskList from './TaskList';

function App() {

  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState([]);

  const [message, setMessage] = useState(
    "Add a task to get started!"
  );

  function addTask() {

    if (task.trim() === "") {
      return;
    }

    setTasks([...tasks, task]);

    setMessage(`Task added: ${task}!`);

    setTask("");

    document.getElementById("heading").style.backgroundColor =
      "lightblue";

  }

  return (

    <div className="container d-flex justify-content-center align-items-center min-vh-100">

      <div className="card planner-card shadow p-4">

        <h1 id="heading" className="text-center mb-4 heading">
          React Task Planner
        </h1>

        <div className="mb-4">

          <input
            type="text"
            placeholder="Enter task name"
            className="form-control mb-3"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button
            className="btn btn-primary w-100"
            onClick={addTask}
          >
            Add Task
          </button>

        </div>

        <TaskList
          tasks={tasks}
          message={message}
        />

      </div>

    </div>

  );

}

export default App;