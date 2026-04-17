const Joi = require('joi');

const createTaskSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .required(),

    description: Joi.string(),

    completed: Joi.boolean(),

    user: Joi.string()
        .pattern(/^[a-fA-F0-9]{24}$/)
        .required()
});

const updateTaskSchema = Joi.object({
    title: Joi.string()
        .min(3),

    description: Joi.string(),

    completed: Joi.boolean(),

    user: Joi.string()
        .pattern(/^[a-fA-F0-9]{24}$/)
        .required()
}).min(1);

module.exports = {createTaskSchema, updateTaskSchema}