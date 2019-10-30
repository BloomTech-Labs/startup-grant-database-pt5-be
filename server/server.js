//Server
const express = require("express");
const server = express();
const cors = require("cors");

server.use(cors());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.status(200).send("<h3>Hello World!!!</h3>");
});

//IMPORT ROUTES IN THIS SECTION
const userRoutes = require('../Users/usersRouter');
const UserRouter = require('../routes/users/user-router.js');
const grantRouter = require('../routes/grants/grants_router.js');

//IMPLEMENTING ROUTES
server.use('/api/login', userRoutes);
server.use("/api/users", UserRouter);
server.use('/api/grants' , grantRouter);



module.exports = server;
