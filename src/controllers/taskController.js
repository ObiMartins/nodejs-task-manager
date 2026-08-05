const Task = require("../models/Task");

// Create a task
const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      success: false,
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
    const allowedUpdates = [
      "title",
      "description",
      "completed"
    ];

    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({
        message: "Invalid update field"
      });
    }

    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json(task);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      success: true,
      message: "Task deleted successfully",
      task
    });

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
