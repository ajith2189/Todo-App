import { useState } from "react";


function Todo() {
  const [tasks, setTasks] = useState([
    { text: "meditate", completed: false },
    { text: "exercise", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const HandleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const HandleSetTask = () => {
    const trimmed = newTask.trim();
    if (trimmed === "" || tasks.some(task => task.text === trimmed)) return;

    setTasks([...tasks, { text: trimmed, completed: false }]);
    setNewTask("");
  };

  const HandleRemoveTask = (index) => {
    const AfterRemoval = tasks.filter((_, i) => i !== index);
    setTasks(AfterRemoval);
  };

  const CompleteTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const MoveUP = (index) => {
    if (index > 0) {
      const updated = [...tasks];
      [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
      setTasks(updated);
    }
  };

  const MoveDown = (index) => {
    if (index < tasks.length - 1) {
      const updated = [...tasks];
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      setTasks(updated);
    }
  };

  const editTask = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const saveTask = (index) => {
    const trimmed = editText.trim();
    if (trimmed === "" || tasks.some((task, i) => task.text === trimmed && i !== index)) return;

    const updated = [...tasks];
    updated[index].text = trimmed;
    setTasks(updated);
    setEditIndex(null);
    setEditText("");
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">Todo List</h2>
      <div className="input-area">
        <input
          className="todo-input"
          type="text"
          placeholder="Add New Task"
          value={newTask}
          onChange={HandleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              HandleSetTask();
            }
          }}
        />
        <button className="add-button" onClick={HandleSetTask}>Add Task</button>
      </div>

      <ol className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            {editIndex === index ? (
              <>
                <input
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveTask(index);
                  }}
                />
                <button className="save-button" onClick={() => saveTask(index)}>Save</button>
              </>
            ) : (
              <>
                <span
                  className={`task-text ${task.completed ? "completed" : ""}`}
                  onClick={() => CompleteTask(index)}
                >
                  {task.text}
                </span>
                <button className="task-button up" onClick={() => MoveUP(index)}>&#9650;</button>
                <button className="task-button down" onClick={() => MoveDown(index)}>&#9660;</button>                
                <button className="task-button edit" onClick={() => editTask(index)}>Edit</button>
                <button className="task-button delete" onClick={() => HandleRemoveTask(index)}>Delete</button>

              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Todo;
