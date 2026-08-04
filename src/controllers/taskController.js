const Task = require("../models/Task");

// Create a task
const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get a task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update a Task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};// Update a task


// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};
