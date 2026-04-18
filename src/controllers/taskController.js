const mongoose = require('mongoose');
const { createTaskSchema, updateTaskSchema } = require('../validators/taskValidator');
const { createTaskService, getAllTasksService,
    getTaskByIdService, updateTaskByIdService,
    deleteTaskByIdService
} = require('../services/taskService');

async function createTaskController(req, res, next) {
    const data = req.body;
    const userId = req.user.userId;
    try {
        if (!data) throw { status: 400, message: "empty data" };
        const { error } = createTaskSchema.validate(data);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        await createTaskService(data, userId);
        res.status(201).json({ message: "new task created successfully!" });
    } catch (err) {
        next(err);
    }
}

async function getAllTasksController(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const filters = { user: req.user.userId };
        if (req.query.search)
            filters.title = { $regex: `^${req.query.search}`, $options: 'i' };

        if (req.query.completed)
            filters.completed = req.query.completed === 'true';

        const tasks = await getAllTasksService(page, limit, filters);
        res.json(tasks);
    } catch (err) {
        next(err);
    }
}

async function getTaskByIdController(req, res, next) {
    try {
        const taskId = req.params.id;
        const userId = req.user.userId;
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            const err = new Error("Invalid task id format");
            err.status = 400;
            throw err;
        }
        const result = await getTaskByIdService(taskId, userId);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function updateTaskByIdController(req, res, next) {
    const data = req.body;
    const userId = req.user.userId;
    try {
        if (!data || !Object.keys(data).length) throw { status: 400, message: "empty data" };
        const { error } = updateTaskSchema.validate(data);
        if (error)
            return res.status(400).json({ message: error.details[0].message });
        const taskId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            const err = new Error("Invalid task id format");
            err.status = 400;
            throw err;
        }
        await updateTaskByIdService(taskId, data, userId);
        res.json("the task updated successfully");
    } catch (err) {
        next(err);
    }
}

async function deleteTaskByIdController(req, res, next) {
    try {
        const taskId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            const err = new Error("Invalid task id format");
            err.status = 400;
            throw err;
        }
        const userId = req.user.userId;
        await deleteTaskByIdService(taskId, userId);
        res.json("task deleted successfully!");
    } catch (err) {
        next(err);
    }
}
module.exports = {
    createTaskController,
    getAllTasksController,
    getTaskByIdController,
    updateTaskByIdController,
    deleteTaskByIdController
};