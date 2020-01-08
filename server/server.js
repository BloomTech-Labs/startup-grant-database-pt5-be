//Server
const express = require('express');
const server = express();
const cors = require('cors');

server.use(cors());
server.use(express.json());

//IMPORT ROUTES IN THIS SECTION
// const userRoutes = require('../Users/usersRouter');

const userRouter = require('../routes/users/user-router.js');
const grantRouter = require('../routes/grants/grants_router.js');
const states = require('./../routes/states_cities/states_route.js');
const counties = require('./../routes/counties/counties_router.js');
const elegibility = require('./../routes/elegibility/elegibility_router.js');
const categories = require('./../routes/categories/categories_router.js');
const applications = require('../routes/grants/grant_apps_router.js');
const savedgrants = require('../routes/savedGrants/savedGrants_router.js');

//IMPLEMENTING ROUTES
// server.use('/api/login', userRoutes);
server.use('/api/users', userRouter);
server.use('/api/grants', grantRouter);
server.use('/api/states', states);
server.use('/api/counties', counties);
server.use('/api/elegibility', elegibility);
server.use('/api/categories', categories);
server.use('/api/applications', applications);
server.use('/api/savedgrants', savedgrants);

server.get('/', (req, res) => {
  res.status(200).send('<h3>Hello World!!!</h3>');
});

module.exports = server;
