import { useState, useRef } from "react";

function Todo() {

  const headingRef = useRef();

  const [tasks, setTasks] = useState([
    { text: "meditate", completed: false },
    { text: "exercise", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

 

  const HandleChangeColor = () => {
    headingRef.current.style.color = "blue";
  };

  const HandleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const HandleSetTask = () => {
    const trimmed = newTask.trim();
    if (trimmed === "") return;
    
    setTasks([...tasks, { text: trimmed, completed: false }]);
    setNewTask("");
  };

  const HandleRemoveTask = (index) => {
    const AfterRemoval = tasks.filter((_, i) => i !== index);
    setTasks(AfterRemoval);
  };

  const HandleCompleteTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const MoveUP = (index) => {
    if (index > 0) {
      const updated = [...tasks];
      [updated[index], updated[index - 1]] = [
        updated[index - 1],
        updated[index],
      ];
      setTasks(updated);
    }
  };

  const MoveDown = (index) => {
    if (index < tasks.length - 1) {
      const updated = [...tasks];
      [updated[index], updated[index + 1]] = [
        updated[index + 1],
        updated[index],
      ];
      setTasks(updated);
    }
  };

  const HandleEditTask = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const HandleSaveTask = (index) => {
    const trimmed = editText.trim();
    if (trimmed === "")
      return;

    const updated = [...tasks];
    updated[index].text = trimmed;
    setTasks(updated);
    setEditIndex(null);
    setEditText("");
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title" ref={headingRef} onClick={HandleChangeColor}>
        Todo List
      </h2>
      <div className="input-wrapper">
        <input
          className="styled-input"
          type="text"
          placeholder="Add your task"
          value={newTask}
          onChange={HandleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              HandleSetTask();
            }
          }}
        />
        <button className="styled-add-button" onClick={HandleSetTask}>
          ADD
        </button>
      </div>

      <ol className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <div className="task-content">
              {editIndex === index ? (
                <>
                  <input
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") HandleSaveTask(index);
                    }}
                  />
                  <button
                    className="save-button"
                    onClick={() => HandleSaveTask(index)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span
                    className={`task-text ${task.completed ? "completed" : ""}`}
                    onClick={() => HandleCompleteTask(index)}
                  >
                    {task.text}
                  </span>
                  <button
                    className="task-button up"
                    onClick={() => MoveUP(index)}
                  >
                    &#9650;
                  </button>
                  <button
                    className="task-button down"
                    onClick={() => MoveDown(index)}
                  >
                    &#9660;
                  </button>
                  <button
                    className="task-button edit"
                    onClick={() => HandleEditTask(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="task-button delete"
                    onClick={() => HandleRemoveTask(index)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Todo;
