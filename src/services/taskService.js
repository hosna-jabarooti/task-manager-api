const Task = require('../models/task');

async function createTaskService(newTask) {
    const existing = await Task.findOne({ title: newTask.title });
    if (existing) throw { status: 400, message: "Task name already exists" };
    return await Task.create(newTask);
}

async function getAllTasksService(page, limit, filters) {
    const skip = (page - 1) * limit;
    const tasks = await Task.find(filters).skip(skip).lean();
    if(!tasks.length) throw {status: 404, message: "No task exists"};

    const total = await Task.countDocuments(filters);

    return {
        data: tasks,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
}

module.exports = {
    createTaskService,
    getAllTasksService
}