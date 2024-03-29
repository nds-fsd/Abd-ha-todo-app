import { useEffect, useState } from "react";
import Task from "./components/taskform/task.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./index.css"


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function getTasks() {
      const res = await fetch("http://localhost:3001/tasks");
      const tasks = await res.json();

      setTasks(tasks);
    }
    getTasks();
  }, []);

  const createNewTask = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        body: JSON.stringify({ title: content, createdAt: Date.now(), completed: false }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTask = await res.json();

      setContent("");
      setTasks([...tasks, newTask]);
    }};

  

  return (
    <main className="container">
      <h1 className="title">postello</h1>
      <form className="form" onSubmit={createNewTask}>
        <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter a new task..."
        className="form__input"
        required
        />
        <button className="form__button" type="submit">Create</button>
      </form>
      <div className="task">
        {tasks.map((task) => (
            <Task key={task._id} task={task} setTasks={setTasks} />
            )     )
        }
      </div>
    </main>
  );
}
