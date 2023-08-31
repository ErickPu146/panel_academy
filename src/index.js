const express = require('express');
const routerApi = require('./routes');
const errorHandler = require('./middlewares/error.handler');

const app = express();
const port = 4000;

app.listen(port, () => {
    console.log('Se inicio correctamenta la aplicacion');
});

app.use(express.json());
routerApi(app);
app.use(errorHandler);