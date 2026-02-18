import { useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Read a book (Atomic Habits)", completed: true },
    { id: 2, title: "meeting today", completed: false },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () =>{
    if(inputValue.trim() === "") return;

    const newTask = {
        id : Date.now(),
        title : inputValue ,
        completed : false
    };

        setTask([...tasks])
    
  }
  return (
    <div>
      <h1>Todo-List</h1>
      <input
        type="text"
        placeholder="Add your Task : "
        onChange={(e) => {
          setTask = e.target.value;
        }}
      />
      <button type="submit">Add</button>

      <ul>
        <li>{task}</li>
      </ul>
    </div>
  );
}
