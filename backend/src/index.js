require("dotenv").config()
const express = require('express');
const {connectDB} =  require("./mongo/connection");
const cors = require('cors');
const {taskRouter} =  require("./controllers/task");
const logreguser = require("./controllers/logreguser");
const authenticate = require('./middleware/authenticate');

const app = express();
app.use(cors());
app.use(express.json());

app.use(taskRouter);
app.use(authenticate);
app.use('/users',logreguser);

connectDB().then(() => console.log("Connected to database!"))

const server = app.listen(3001, () => {
    console.log('Server is up and running ⚡')
});
