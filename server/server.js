//Server
const express = require('express');
const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());

//IMPORT ROUTES IN THIS SECTION
const userRoutes = require('../Users/usersRouter');

//IMPLEMENTING ROUTES
server.use('/api/login', userRoutes);

server.get('/', (req, res) => {
  res.status(200).send('<h3>Hello World!!!</h3>');
});

module.exports = server;
