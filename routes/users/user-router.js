const router = require('express').Router();
//Connect to usersmodel
const DB = require('./user-model');

//Importing the restricted middleware to verify token
const verify = require('../../auth/restricted-middleware');

//==========================================================================
//Get all users

router.get('/', async (req, res) => {
  try {
    const users = await DB.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get users' });
  }
});

//==========================================================================
//Login user or create a new user if a current user is not found
//RETURNS THE USER ID

router.post('/login', verify, async (req, res) => {
  // console.log('Passed middleware from HTTP request: ', req.body.decodedToken);
  //Deconstructing decoded token
  const userInfo = req.body.decodedToken;
  const name = userInfo.name;
  const email = userInfo.email;
  const uid = userInfo.uid;

  const creds = {
    first_name: name,
    email: email,
    uid: uid,
    created_at: new Date()
  };
  // console.log(creds);
  try {
    // console.log('User email', email);
    const currentUser = await DB.findByEmail(email);
    // console.log('CurrentUser', currentUser);

    //LOGIC TO SIGNUP OR LOGIN USER
    //if request is not an empty object then an account was found and the id is return
    if (`${currentUser}`) {
      // console.log('Sign in!', currentUser[0], `${currentUser}`);
      res.status(200).json({ found: currentUser[0] });
      //if request is an empty object then an account is created and the id is return
    } else {
      // console.log('Sign up!', currentUser);
      const newUser = await DB.add(creds);
      res.status(201).json({ created: newUser });
    }
  } catch (err) {
    // console.log('Error during LOGIN/SIGNUP http request', err);
    res.status(500).json({ message: err.message });
  }
});

//==========================================================================
//Delete user in the db it takes the user email

router.delete('/', async (req, res) => {
  const { email } = req.body;
  try {
    const delUsers = await DB.remove(email);
    // console.log(delUsers === 0);
    if (delUsers === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json({ message: 'User has been deleted' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//==========================================================================
//Update user info ** if email and uid are the same, field must be left empty
//TODO:
//During login return the id to the FE and save it in local storage
//Then when updating take the ID from there
//
router.put('/:id', async (req, res) => {
  const newInfo = req.body;
  const { id } = req.params;
  try {
    const updateUser = await DB.updateUser(id, newInfo);
    res.status(200).json({ message: updateUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//==========================================================================

module.exports = router;
