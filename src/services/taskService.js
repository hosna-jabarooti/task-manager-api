const Task = require('../models/task');

async function createTaskService(newTask) {
    const existing = await Task.findOne({ title: newTask.title });
    if (existing) throw { status: 400, message: "Task name already exists" };
    return await Task.create(newTask);
}

module.exports ={
    createTaskService
}