const Joi = require('joi');

const createTaskSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .required(),
    description: Joi.string(),
    completed: Joi.boolean(),
});

const updateTaskSchema = Joi.object({
    title: Joi.string()
        .min(3),
    description: Joi.string(),
    completed: Joi.boolean(),
}).min(1);

module.exports = {createTaskSchema, updateTaskSchema}