const express = require("express")
const { verifyLogin } = require("../controllers/login.controller")
const api = express.Router()

api.post("/", verifyLogin)

module.exports = api;