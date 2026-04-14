const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createTaskController } = require('../controllers/taskController');

const router = express.Router();

router.post('/tasks', authMiddleware, createTaskController);

module.exports = router;