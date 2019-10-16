//Server 
const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.status(200).send('<h3>Hello World!!!</h3>');
})

module.exports = server;