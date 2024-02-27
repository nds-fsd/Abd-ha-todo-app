import styles from "./task.module.css"

export default function Task(props) {
    const { task, setTasks, update, setUpdate } = props;

    const updateTask = async (taskId, taskStatus) => {
        await fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: "PUT",
            body: JSON.stringify({ completed: taskStatus }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        setTasks(currentTasks => {
            return currentTasks.map((currentTask) => {
                if (currentTask._id === taskId) {
                    return { ...currentTask, completed: !currentTask.completed };
                }
                return currentTask;
            });
        });
    };

    const deleteTask = async (taskId) => {
        const res = await fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: "DELETE"
        });
        const json = await res.json();
        if (json.acknowledged) {
            settasks(currentTasks => {
                return currentTasks
                .filter((currentTask) => (currentTask._id !== taskId));
            })
        } setUpdate(!update)
    };

    return (
         <div className={styles.task}> 
                <p>{task.title}</p>

            <div className="mutations">
                <button
                    className="task__status"
                    onClick={() => updateTask(task._id, !task.completed)}
                >
                    {(task.completed) ? "☑" : "☐"}
                </button>
                <button
                    className="task__delete"
                    onClick={() => deleteTask(task._id)}
                >
                    🗑️
                </button>
            </div>
        </div>
    )
}
    