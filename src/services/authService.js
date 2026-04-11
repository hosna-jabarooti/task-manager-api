const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("../models/user");

async function registerService(data) {
    const existing = await User.findOne({ email: data.email });

    if (existing) throw new Error('email already exists');
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
        name: data.name,
        email: data.email,
        password: hashedPassword
    });

    const { password, ...safeData } = user.toObject();
    return safeData;
};

async function loginService(data) {
    const user = await User.findOne({ email: data.email });

    if (!user) throw new Error('Invalid credentials');
    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return { token };
};

module.exports = {
    registerService,
    loginService
};

