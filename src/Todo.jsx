import { useState } from "react";

function Todo() {
  const [tasks, setTasks] = useState([
    { text: "meditate", completed: false },
    { text: "exercise", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

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

  return (
    <>
      <p>Todo List</p>
      <input
        type="text"
        placeholder="Add New task"
        value={newTask}
        onChange={HandleInputChange} 
        onKeyDown={(e) => {
            if (e.key === "Enter") {
              HandleSetTask();
            }}}
      />
      <button onClick={HandleSetTask}>Add task</button>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              onClick={() => CompleteTask(index)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {task.text}
            </span>{" "}
            <button onClick={() => HandleRemoveTask(index)}>Delete</button>{" "}
            <button onClick={() => MoveUP(index)}>Up</button>{" "}
            <button onClick={() => MoveDown(index)}>Down</button>
          </li>
        ))}
      </ol>
    </>
  );
}

export default Todo;
