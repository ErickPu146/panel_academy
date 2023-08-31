const usersRouter = require("./users.router")

const routerApi = (app) => {
    app.use("/users", usersRouter)
}

module.exports = routerApi;