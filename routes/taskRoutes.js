// =============================================
//  routes/taskRoutes.js
// =============================================

const express = require('express');
const router  = express.Router();

const { getTasks, createTask, getTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// All task routes are protected - user must be logged in
router.use(protect);

router.route('/')
  .get(getTasks)    // GET  /api/tasks
  .post(createTask); // POST /api/tasks

router.route('/:id')
  .get(getTask)       // GET    /api/tasks/:id
  .put(updateTask)    // PUT    /api/tasks/:id
  .delete(deleteTask); // DELETE /api/tasks/:id

module.exports = router;
