import { useState, useEffect } from "react";
import { addTask, fetchTasks, updateTask, deleteTask } from "./services/taskService";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("daily");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  // Load tasks from Supabase on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data || []);
      console.log("✅ Tasks loaded from Supabase:", data);
    } catch (error) {
      console.error("❌ Error loading tasks:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    try {
      const newTask = await addTask(inputValue, selectedPeriod);
      setTasks([...tasks, newTask]);
      setInputValue("");
      console.log("✅ Task added to Supabase:", newTask);
    } catch (error) {
      console.error("❌ Error adding task:", error.message);
    }
  };

  const handleStartEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingValue(task.title);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingValue("");
  };

  const handleUpdateTask = async (id) => {
    if (editingValue.trim() === "") return;

    try {
      await updateTask(id, { title: editingValue.trim() });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, title: editingValue.trim() } : task
        )
      );
      handleCancelEdit();
      console.log("✅ Task updated in Supabase");
    } catch (error) {
      console.error("❌ Error updating task:", error.message);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));

      if (editingTaskId === id) {
        handleCancelEdit();
      }
      console.log("✅ Task deleted from Supabase");
    } catch (error) {
      console.error("❌ Error deleting task:", error.message);
    }
  };

  const handleToggleCompleted = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);
      await updateTask(id, { completed: !task.completed });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
      console.log("✅ Task toggled in Supabase");
    } catch (error) {
      console.error("❌ Error toggling task:", error.message);
    }
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const periodConfig = [
    { key: "daily", title: "Daily Objective" },
    { key: "weekly", title: "Weekly Objective" },
    { key: "monthly", title: "Monthly Objective" },
  ];

  const renderPeriodTasks = (period) => {
    const periodTasks = tasks.filter((task) => task.period === period);

    if (periodTasks.length === 0) {
      return (
        <p className="rounded-xl border border-dashed border-white/15 bg-slate-900/30 px-4 py-3 text-sm text-slate-400">
          No tasks in this objective yet.
        </p>
      );
    }

    return (
      <ul className="space-y-3">
        {periodTasks.map((task) => (
          <li
            key={task.id}
            className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20"
          >
            {editingTaskId === task.id ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="text"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  className="h-11 flex-1 rounded-lg border border-white/10 bg-slate-950/80 px-3 text-sm text-white placeholder:text-slate-500 outline-none ring-indigo-400 transition focus:ring-2"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateTask(task.id)}
                    className="h-11 rounded-lg bg-emerald-500 px-4 text-sm font-medium text-white transition hover:bg-emerald-400"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="h-11 rounded-lg border border-white/15 bg-slate-800 px-4 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p
                  className={`text-sm font-medium sm:text-base ${
                    task.completed ? "text-slate-500 line-through" : "text-slate-100"
                  }`}
                >
                  {task.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleCompleted(task.id)}
                    className={`h-10 rounded-lg px-3 text-xs font-semibold uppercase tracking-wide transition ${
                      task.completed
                        ? "bg-slate-700 text-slate-200 hover:bg-slate-600"
                        : "bg-emerald-500/90 text-white hover:bg-emerald-400"
                    }`}
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStartEdit(task)}
                    className="h-10 rounded-lg bg-indigo-500/90 px-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-indigo-400"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                    className="h-10 rounded-lg bg-rose-500/90 px-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-rose-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-10">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/25 blur-3xl" />

      <section className="relative mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
        
        {loading ? (
          <div className="py-12 text-center">
            <p className="text-slate-300">Loading tasks from Supabase...</p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-300">
              Productivity
            </p>
            <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
              Premium Todo List
            </h1>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-2 text-right">
            <p className="text-xs text-slate-400">Completed</p>
            <p className="text-lg font-semibold text-emerald-400">
              {completedCount}/{tasks.length}
            </p>
          </div>
        </div>

        <form onSubmit={handleAddTask} className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Add a new task"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            className="h-12 flex-1 rounded-xl border border-white/10 bg-slate-900/80 px-4 text-sm text-white placeholder:text-slate-500 outline-none ring-indigo-400 transition focus:ring-2"
          />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="h-12 rounded-xl border border-white/10 bg-slate-900/80 px-3 text-sm text-slate-100 outline-none ring-indigo-400 transition focus:ring-2"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button
            type="submit"
            className="h-12 rounded-xl bg-indigo-500 px-5 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            Add
          </button>
        </form>

        <div className="space-y-6">
          {periodConfig.map((periodItem) => {
            const periodTasks = tasks.filter((task) => task.period === periodItem.key);
            const periodCompleted = periodTasks.filter((task) => task.completed).length;

            return (
              <section key={periodItem.key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-100">
                    {periodItem.title}
                  </h2>
                  <span className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-xs text-slate-300">
                    {periodCompleted}/{periodTasks.length || 0} done
                  </span>
                </div>
                {renderPeriodTasks(periodItem.key)}
              </section>
            );
          })}
        </div>
          </>
        )}
      </section>
    </main>
  );
}
