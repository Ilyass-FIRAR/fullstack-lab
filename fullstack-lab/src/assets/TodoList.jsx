import { useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Read a book (Atomic Habits)", completed: true },
    { id: 2, title: "meeting today", completed: false },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: inputValue,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue("");
  };
  return (
    
    <div>
    <h1>Todo-List</h1>  
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Add your Task "
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
