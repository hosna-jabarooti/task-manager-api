const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createTaskController, getAllTasksController,
    getTaskByIdController, updateTaskByIdController,
    deleteTaskByIdController
} = require('../controllers/taskController');

const router = express.Router();

router.post('/tasks', authMiddleware, createTaskController);
router.get('/tasks', authMiddleware, getAllTasksController);
router.get('/tasks/:id', authMiddleware, getTaskByIdController);
router.patch('/tasks/:id', authMiddleware, updateTaskByIdController);
router.delete('/tasks/:id', authMiddleware, deleteTaskByIdController);

module.exports = router;