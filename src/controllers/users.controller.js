const { allUsers, oneUser } = require("../services/users.service");

const getAllUsers = async (req, res) => {
    res.status(200).json(await allUsers());
}

const getOneUser = async (req, res) => {
    const { id } = req.params;
    res.status(200).json(await oneUser(id));
}

module.exports = { getAllUsers, getOneUser };