const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createTaskController, getAllTasksController} = require('../controllers/taskController');

const router = express.Router();

router.post('/tasks', authMiddleware, createTaskController);
router.get('/tasks', authMiddleware, getAllTasksController);

module.exports = router;