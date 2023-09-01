const Boom = require("@hapi/boom");
const { allUsers, oneUser, createUser, deleteUser, updateUser } = require("../services/users.service");

const getAllUsers = async (req, res) => {
    try {
        const users = await allUsers();
        if (!users || users.length === 0) {
            const error = Boom.notFound('No users found');
            throw error;
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(error.output.statusCode).json(error.output.payload);
    }
}

const getOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await oneUser(id);
        if (!user) {
            const error = Boom.notFound('User not found');
            throw error;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(error.output.statusCode).json(error.output.payload);
    }
}

const createOneUser = async (req, res) => {
    try {
        const data = req.body;
        const newUser = await createUser(data);
        res.status(201).json(newUser);
    } catch (error) {
        if (error.isBoom) {
            res.status(error.output.statusCode).json(error.output.payload);
        } else {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};

const deleteOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).json(await deleteUser(id));
    } catch (error) {
        res.status(error.output.statusCode).json(error.output.payload);
    }
}

const updateOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        res.status(200).json(await updateUser(id, data));
    } catch (error) {
        res.status(error.output.statusCode).json(error.output.payload);
    }
}


module.exports = { getAllUsers, getOneUser, createOneUser, deleteOneUser, updateOneUser };