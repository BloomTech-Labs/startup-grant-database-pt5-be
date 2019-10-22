const router = require('express').Router();

//Connect to usersmodel
const DB = require('./usersModel');

//register new user or log user in
router.post('/login', (req, res) => {
  let userInfo = req.body;
  //TODO: decode token using JWT to gain access to the user's email and UID
});
