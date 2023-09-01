const express = require("express")
const { getAllUsers, getOneUser, createOneUser, deleteOneUser, updateOneUser } = require("../controllers/users.controller")
const api = express.Router()

api.get("/", getAllUsers)
api.get("/:id", getOneUser)
api.post("/", createOneUser)
api.delete("/:id", deleteOneUser)
api.patch("/:id", updateOneUser)

module.exports = api;