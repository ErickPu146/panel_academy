const express = require("express")
const { getAllUsers, getOneUser } = require("../controllers/users.controller")
const api = express.Router()

api.get("/", getAllUsers)
api.get("/:id", getOneUser)

module.exports = api;