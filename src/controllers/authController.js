const { registerService, loginService } = require('../services/authService');
const { registerSchema, loginSchema } = require('../validators/authValidator');

async function registerController(req, res) {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const user = await registerService(req.body);
        res.status(201).json({
            message: "User created",
            user
        })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

async function loginController(req, res) {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const token = await loginService(req.body);
        res.json({
            message: "Login successful",
            token
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    registerController,
    loginController
};