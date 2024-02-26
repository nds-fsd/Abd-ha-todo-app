export default function Task(props) {
    const { task, setTasks } = props;

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
        // TODO delete endpoint is not implemented in backend
        const res = await fetch(`backend/src/controllers/task.js${taskId}`, {
            method: "DELETE"
        });
        const json = await res.json();
        if (json.acknowledged) {
            settasks(currentTasks => {
                return currentTasks
                .filter((currentTask) => (currentTask._id !== taskId));
            })
        }
    };

    return (
         <div className="task">
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
    