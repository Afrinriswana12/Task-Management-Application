export default function TaskList({
  tasks,
  onDelete,
  onComplete,
}) {
  return (
    <div>
      <h3>My Tasks</h3>

      {tasks.map((task) => (
        <div
  key={task._id}
  style={{
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "15px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
  }}
>
          <h4>{task.title}</h4>

          <p>{task.description}</p>

          <p>
  Status:
  <span
    style={{
      marginLeft: "10px",
      padding: "5px 10px",
      borderRadius: "20px",
      color: "white",
      backgroundColor:
        task.status === "Completed"
          ? "green"
          : "orange",
    }}
  >
    {task.status}
  </span>
</p>

          <button
  disabled={
    task.status === "Completed"
  }
  onClick={() =>
    onComplete(task._id)
  }
  style={{
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    marginRight: "10px",
    cursor: "pointer",
  }}
>
  Complete
</button>

          <button
  onClick={() =>
    onDelete(task._id)
  }
  style={{
    backgroundColor: "crimson",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  Delete
</button>
        </div>
      ))}
    </div>
  );
}