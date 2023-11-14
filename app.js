const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const {sequelize} = require('./helpers')
const httpServer = require('http')
const SocketService = require('./socketService');
require("dotenv").config();
const config = require('./config')[process.env.NODE_ENV || 'development'];

const app = express()

const usersRouter = require('./routes/users');

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

function connectToPostgres() {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.log('Unable to connect to the database:', error);
        process.exit(1);
    });

    return sequelize;
}

const postgresClient = connectToPostgres();
config.postgres.client = postgresClient;

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api/", usersRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message })
})

const http = httpServer.Server(app);
const socketService = new SocketService(http);
app.set('socketService', socketService);

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});