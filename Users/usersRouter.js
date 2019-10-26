const router = require('express').Router();
//Connect to usersmodel
const DB = require('./usersModel');

//Importing the restricted middleware to verify token
const verify = require('../auth/restricted-middleware');

//To run the server locally install npm and express

//==========================================================================
//Login user or create a new user if a current user is not found
router.post('/', verify, async (req, res) => {
  // console.log('Passed middleware from HTTP request: ', req.body.decodedToken);
  //Deconstructing decoded token
  const userInfo = req.body.decodedToken;
  const name = userInfo.name;
  const email = userInfo.email;
  const uid = userInfo.uid;

  //TODO:
  //
  // [x] Pass the rest of user info life first and last name
  // [x] FIX DATE TO USE JS FUNCTION
  // [x] Handle errors correctly
  // [x] Hide private keys from firebase

  //Date format for timestamp
  var timeStamp = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  //end of date

  const creds = {
    first_name: name,
    email: email,
    uid: uid,
    created_at: timeStamp
  };
  // console.log(creds);
  try {
    // console.log('User email', email);
    const currentUser = await DB.findByEmail(email);
    // console.log('CurrentUser', currentUser);

    //LOGIC TO SIGNUP OR LOGIN USER
    //if request is not an empty object then an account was found and the id is return
    if (`${currentUser}`) {
      res.status(200).json({ found: currentUser[0] });
      //if request is an empty object then an account is created and the id is return
    } else {
      const newUser = await DB.add(creds);
      res.status(201).json({ created: newUser });
    }
  } catch (err) {
    console.log('Error during LOGIN/SIGNUP http request', err);
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
//Delete user in the db it takes the user email

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
//Update user info ** if email and uid are the same field must be left empty

router.put('/:id', async (req, res) => {
  const newInfo = req.body;
  const { id } = req.params;
  try {
    const updateUser = await DB.updateUser(id, newInfo);
    res.status(200).json({ message: updateUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//==========================================================================

module.exports = router;
