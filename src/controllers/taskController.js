const { createTaskSchema, updateTaskSchema } = require('../validators/taskValidator');
const { createTaskService } = require('../services/taskService');

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

module.exports = {
    createTaskController
};