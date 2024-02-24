import { useEffect, useState } from "react";


export default function App() {
  const [task, settasks] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function gettask() {
      const res = await fetch("./backend/src/controllers/task.js");
      const task = await res.json();

      settasks(task);
    }
    gettask();
  }, []);

  const createNewTask = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch("./backend/src/controllers/task.js", {
        method: "POST",
        body: JSON.stringify({ task: content }),
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
        {(task.length > 0) &&
          task.map((task) => (
            <task key={task._id} task={task} settasks={settasks}   />
          ))
        }
      </div>
    </main>
  );
}