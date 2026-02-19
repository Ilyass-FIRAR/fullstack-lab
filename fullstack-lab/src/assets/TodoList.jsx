import { useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Read a book (Atomic Habits)", completed: true },
    { id: 2, title: "meeting today", completed: false },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

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

  const handleStartEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingValue(task.title);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingValue("");
  };

  const handleUpdateTask = (id) => {
    if (editingValue.trim() === "") return;

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: editingValue.trim() } : task
      )
    );
    handleCancelEdit();
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
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                />
                <button type="button" onClick={() => handleUpdateTask(task.id)}>
                  Save
                </button>
                <button type="button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                {task.title}{" "}
                <button type="button" onClick={() => handleStartEdit(task)}>
                  Update
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
