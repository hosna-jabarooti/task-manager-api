const Task = require('../models/task');

async function createTaskService(newTask) {
    const existing = await Task.findOne({ title: newTask.title });
    if (existing) throw { status: 400, message: "Task name already exists" };
    return await Task.create(newTask);
}

async function getAllTasksService(page, limit, filters) {
    const skip = (page - 1) * limit;
    const tasks = await Task.find(filters).skip(skip).lean();
    if (!tasks.length) throw { status: 404, message: "No task exists" };

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

async function getTaskByIdService(taskId) {
    const task = await Task.findById(taskId).lean();
    if (!task) throw { status: 404, message: "no such product exists!" };
    return task;
}

async function updateTaskByIdService(taskId, data) {
    const existing = await Task.findById(taskId).lean();
    if (!existing) throw { status: 404, message: "No such task exists" };
    const updated = await Task.findOneAndUpdate({
        _id: taskId, user: data.user
    }, data, {
        returnDocument: "after", runValidators: true
    });
    // if (!updated) throw { status: 403, message: "No Access!" };
    return updated;
}

async function deleteTaskByIdService(taskId, userId) {
    const existing = await Task.findById(taskId).lean();
    if (!existing) throw { status: 404, message: "No such task exists" };
    return await Task.findOneAndDelete({
        _id: taskId, user: userId
    });
}
module.exports = {
    createTaskService,
    getAllTasksService,
    getTaskByIdService,
    updateTaskByIdService,
    deleteTaskByIdService
}