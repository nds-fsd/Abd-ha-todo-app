export default function Task(props) {
    const { task, settasks } = props;

    const updatetask = async (taskId, taskStatus) => {
        const res = await fetch(`backend/src/controllers/task.js${taskId}`, {
            method: "PUT",
            body: JSON.stringify({ status: taskStatus }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        const json = await res.json();
        if (json.acknowledged) {
            settasks(currentTasks => {
                return currentTasks.map((currentTask) => {
                    if (currentTask._id === taskId) {
                        return { ...currentTask, status: !currentTask.status };
                    }
                    return currentTask;
                });
            });
        }
    };

    const deletetask = async (taskId) => {
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
                <p>{task.task}</p>
            <div className="mutations">
                <button
                    className="task__status"
                    onClick={() => updatetask(task._id, task.status)}
                >
                    {(task.status) ? "☑" : "☐"}
                </button>
                <button
                    className="task__delete"
                    onClick={() => deletetask(task._id)}
                >
                    🗑️
                </button>
            </div>
        </div>
    )
}
    