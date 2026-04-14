const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createTaskController, getAllTasksController,
    getTaskbyIdController
} = require('../controllers/taskController');

const router = express.Router();

router.post('/tasks', authMiddleware, createTaskController);
router.get('/tasks', authMiddleware, getAllTasksController);
router.get('/tasks/:id', authMiddleware, getTaskbyIdController);

module.exports = router;