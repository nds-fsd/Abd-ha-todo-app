import { useEffect, useState } from "react";
import task from "./components/task.js";

export default function App() {
  const [task, settasks] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function gettask() {
      const res = await fetch("./backend/src/controllers/task.js");
      const task = await res.json();

      settasks(task);
    }
    getTodos();
  }, []);

  const createNewTask = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newtask = await res.json();

      setContent("");
      settasks([...task, newtask]);
    }
  }

  return (
    <main className="container">
      <h1 className="title">Awesome Todos</h1>
      <form className="form" onSubmit={createNewTodo}>
        <input 
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter a new todo..."
        className="form__input"
        required 
        />
        <button className="form__button" type="submit">Create Todo</button>
      </form>
      <div className="task">
        {(task.length > 0) &&
          task.map((task) => (
            <task key={task._id} task={task} settasks={settasks}   />
          ))
        }
      </div>
    </main>
  );
}