const Boom = require("@hapi/boom");
const { login } = require("../services/login.service");

const verifyLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await login(email, password);
        if (!user) {
            const error = Boom.forbidden('User not to login');
            throw error;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(error.output.statusCode).json(error.output.payload);
    }
}

module.exports = { verifyLogin };