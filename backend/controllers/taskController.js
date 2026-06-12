const Task = require("../models/Task");

//create task

const createTask = async (req, res) => {
  const { title, description } = req.body;

  const task = await Task.create({
    title,
    description,
    user: req.user._id,
  });

  res.status(201).json(task);
};

//get task

const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user._id,
  });

  res.json(tasks);
};

//update task

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedTask);
};

//delete task

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  await task.deleteOne();

  res.json({
    message: "Task deleted",
  });
};

//export

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};