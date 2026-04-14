const { createTaskSchema, updateTaskSchema } = require('../validators/taskValidator');
const { createTaskService, getAllTasksService } = require('../services/taskService');

async function createTaskController(req, res) {
    const data = req.body;
    data.user = req.user.userId;
    try {
        const { error } = createTaskSchema.validate(data);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const newTask = await createTaskService(data);
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

module.exports = {
    createTaskController,
    getAllTasksController
};