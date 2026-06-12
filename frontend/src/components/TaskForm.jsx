import { useState } from "react";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    onCreate({
      title,
      description,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form
  onSubmit={submitHandler}
  style={{
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  }}
>
      <h3>Create Task</h3>

      <input
  type="text"
  placeholder="Task Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  required
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginBottom: "10px",
  }}
/>

      <br /><br />

      <textarea
  placeholder="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows="4"
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginBottom: "10px",
  }}
/>

      <br /><br />

      <button
  type="submit"
  style={{
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Add Task
</button>
    </form>
  );
}