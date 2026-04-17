const mongoose = require('mongoose');
const { createTaskSchema, updateTaskSchema } = require('../validators/taskValidator');
const { createTaskService, getAllTasksService,
    getTaskByIdService, updateTaskByIdService
} = require('../services/taskService');

async function createTaskController(req, res) {
    const data = req.body;
    try {
        if (!data) throw { status: 400, message: "empty data" };
        data.user = req.user.userId;
        const { error } = createTaskSchema.validate(data);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        await createTaskService(data);
        res.status(201).json({ message: "new task created successfully!" });
    } catch (err) {
        res.status(err.status || 500).json(err.message || "Internal server Error");
    }
}

async function getAllTasksController(req, res) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const filters = { user: req.user.userId };
        const tasks = await getAllTasksService(page, limit, filters);
        res.json(tasks);
    } catch (err) {
        res.status(err.status || 500).json(err.message || "Internal server Error");
    }
}

async function getTaskByIdController(req, res) {
    try {
        const taskId = req.params.id;
        const userId = req.user.userId;
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            const err = new Error("Invalid task id format");
            err.status = 400;
            throw err;
        }
        const result = await getTaskByIdService(taskId);
        if (result.user.toString() !== userId) throw { status: 403, message: "No Access!" };
        res.json(result);
    } catch (err) {
        res.status(err.status || 500).json(err.message || "Internal server Error");
    }
}

async function updateTaskByIdController(req, res) {
    const data = req.body;
    try {
        if (!data || !Object.keys(data).length) throw { status: 400, message: "empty data" };
        data.user = req.user.userId;
        const { error } = updateTaskSchema.validate(data);
        if (error)
            return res.status(400).json({ message: error.details[0].message });
        const taskId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            const err = new Error("Invalid task id format");
            err.status = 400;
            throw err;
        }
        await updateTaskByIdService(taskId, data);
        res.json("the task updated successfully");
    } catch (err) {
        res.status(err.status || 500).json(err.message || "Internal server Error");
    }
}
module.exports = {
    createTaskController,
    getAllTasksController,
    getTaskByIdController,
    updateTaskByIdController
};