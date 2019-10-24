const router = require('express').Router();
//Connect to usersmodel
const DB = require('./usersModel');

//To run the server locally install npm and express

//==========================================================================
//Login user or create a new user if a current user is not found

router.post('/', async (req, res) => {
  const userInfo = req.body;
  const email = userInfo.email;
  try {
    //TODO: decode token using JWT as middleware to gain access to the user's email and UID

    // console.log('User email', email);
    const currentUser = await DB.findByEmail(email);
    // console.log('CurrentUser', currentUser);

    //if request is not an empty object then an account was found and the id is return
    if (`${currentUser}`) {
      res.status(200).json({ Found: currentUser[0] });
      //if request is an empty object then an account is created and the id is return
    } else {
      const newUser = await DB.add(userInfo);
      res.status(201).json({ Created: newUser });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//==========================================================================
//Read/Get all users in the db

router.get('/', async (req, res) => {
  // res.status(200).send('Registration end point');
  try {
    const users = await DB.find();
    // console.log(users);
    res.status(201).json({ users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//==========================================================================
//Delete user in the db

router.delete('/', async (req, res) => {
  const { email } = req.body;
  try {
    const delUsers = await DB.remove(email);
    console.log(delUsers === 0);
    if (delUsers === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json({ message: 'User has been deleted' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//==========================================================================

module.exports = router;
