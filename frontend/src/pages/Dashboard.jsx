import { useEffect, useState } from "react";
import API from "../services/api";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");

    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (task) => {
    await API.post("/tasks", task);

    fetchTasks();
  };

  const deleteTask = async (id) => {
  const confirmDelete =
    window.confirm(
      "Are you sure you want to delete this task?"
    );

  if (!confirmDelete) return;

  await API.delete(`/tasks/${id}`);

  fetchTasks();
};

  const completeTask = async (id) => {
    await API.put(`/tasks/${id}`, {
      status: "Completed",
    });

    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  const filteredTasks = tasks.filter((task) => {
  const matchesSearch =
    task.title
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesFilter =
    filter === "All" ||
    task.status === filter;

  return matchesSearch && matchesFilter;
});

  return (
    <div style={{ padding: "20px" }}>
      <h1
  style={{
    textAlign: "center",
    marginBottom: "20px",
    maxWidth: "900px",
width: "100%",
  }}
>
  Task Dashboard
</h1>
      <div
  style={{
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  }}
>
  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      flex: "1",
minWidth: "180px",
    }}
  >
    <h3>Total Tasks</h3>
    <h2>{tasks.length}</h2>
  </div>

  <div
    style={{
      background: "#fff3cd",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      flex: "1",
minWidth: "180px",
    }}
  >
    <h3>Pending</h3>
    <h2>
      {
        tasks.filter(
          (task) => task.status === "Pending"
        ).length
      }
    </h2>
  </div>

  <div
    style={{
      background: "#d4edda",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      flex: "1",
minWidth: "180px",
    }}
  >
    <h3>Completed</h3>
    <h2>
      {
        tasks.filter(
          (task) => task.status === "Completed"
        ).length
      }
    </h2>
  </div>
</div>
      

      <hr />
      <input
  type="text"
  placeholder="Search tasks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  marginBottom: "15px",
  fontSize: "16px",
}}
/>
<div style={{ marginBottom: "20px",
     minHeight: "10vh",
    backgroundColor: "#f5f7fb",
 }}>
  <button
  onClick={() => setFilter("All")}
  style={{
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px",
    backgroundColor:
      filter === "All"
        ? "#3b82f6"
        : "#e5e7eb",
    color:
      filter === "All"
        ? "white"
        : "black",
  }}
>
  All
</button>

<button
  onClick={() => setFilter("Pending")}
  style={{
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px",
    backgroundColor:
      filter === "Pending"
        ? "#f59e0b"
        : "#e5e7eb",
    color:
      filter === "Pending"
        ? "white"
        : "black",
  }}
>
  Pending
</button>

  <button
  onClick={() => setFilter("Completed")}
  style={{
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor:
      filter === "Completed"
        ? "#10b981"
        : "#e5e7eb",
    color:
      filter === "Completed"
        ? "white"
        : "black",
  }}
>
  Completed
</button>
</div>
      <TaskForm onCreate={createTask} />


      <hr />

      <TaskList
  tasks={filteredTasks}
  onDelete={deleteTask}
  onComplete={completeTask}
/>

      <button
  onClick={logout}
  style={{
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
  }}
>
  Logout
</button>

    </div>
  );
}