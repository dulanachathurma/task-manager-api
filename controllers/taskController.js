// =============================================
//  controllers/taskController.js
//  Handles: Create, Read, Update, Delete Tasks
// =============================================

const Task = require('../models/Task');

// ---- @GET /api/tasks ----
// Get all tasks for logged-in user
const getTasks = async (req, res) => {
  try {
    // Filter by query params (optional)
    const filter = { user: req.user._id };
    if (req.query.completed) filter.completed = req.query.completed === 'true';
    if (req.query.priority)  filter.priority  = req.query.priority;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: tasks.length, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---- @POST /api/tasks ----
// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      priority,
      dueDate,
    });

    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---- @GET /api/tasks/:id ----
// Get single task by ID
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Make sure logged-in user owns this task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---- @PUT /api/tasks/:id ----
// Update a task
const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,           // return updated document
      runValidators: true, // run schema validators on update
    });

    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---- @DELETE /api/tasks/:id ----
// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await task.deleteOne();
    res.json({ success: true, message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getTasks, createTask, getTask, updateTask, deleteTask };
