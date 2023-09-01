const usersRouter = require("./users.router")
const loginRouter = require("./login.router")

const routerApi = (app) => {
    app.use("/users", usersRouter)
    app.use("/login", loginRouter)
    app.all('*', (req, res) => {
        res.status(404).send('404 Invalid Request');
    });
}

module.exports = routerApi;