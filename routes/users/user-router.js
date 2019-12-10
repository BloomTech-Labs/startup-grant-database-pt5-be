const router = require('express').Router();
//Connect to usersmodel
const DB = require('./user-model');

//Importing the restricted middleware to verify token
const verify = require('../../auth/restricted-middleware');

//==========================================================================
//Get all users

router.get('/', async (req, res) => {
  try {
    console.log('Getting users');
    const users = await DB.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

//==========================================================================
//Get all category_user
// router.get('/cat', async (req, res) => {
//   try {
//     console.log('Getting cat_users');
//     const usersCat = await DB.findCat();
//     res.status(200).json(usersCat);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// });

//==========================================================================
//Get all category_user
// router.get('/eli', async (req, res) => {
//   try {
//     console.log('Getting cat_users');
//     const usersCat = await DB.findEli();
//     res.status(200).json(usersCat);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// });

//==========================================================================
// Get the user specific info based off ID for dashboard

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // console.log("Getting user info");
    const user = await DB.findById(id);
    res.status(200).json(user);
  } catch (err) {
    // console.error(err.message);
    res.status(500).json({ message: err.message });
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
    // console.log('Loging in');
    // console.log('User email', email);
    const currentUser = await DB.findByEmail(email);
    // console.log('CurrentUser', currentUser);

    //LOGIC TO SIGNUP OR LOGIN USER
    //if request is not an empty object then an account was found and the id is return
    if (`${currentUser}`) {
      // console.log('Sign in!', currentUser[0]);
      const id = currentUser[0].id;
      res.status(200).json({ id: id });
      //if request is an empty object then an account is created and the id is return
    } else {
      const newUser = await DB.add(creds);
      // console.log('Sign up!', newUser);
      const id = newUser[0];
      res.status(201).json({ id: id });
    }
  } catch (err) {
    // console.log('Error during LOGIN/SIGNUP http request', err);
    res.status(500).json({ message: err.message });
  }
});

//==========================================================================
// Delete User, takes the user id

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const delUsers = await DB.remove(id);
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

router.put('/:id', async (req, res) => {
  const newInfo = req.body;
  const { id } = req.params;
  try {
    const updateUser = await DB.updateUser(id, newInfo);

    if (updateUser === 1) {
      console.log(updateUser, newInfo, id);
      res.status(201).json({ message: updateUser });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.log(newInfo, id, err);
    res.status(500).json({ message: err.message });
  }
});

//=======================================================//
//             Completing user registration
//=======================================================//

//==========================================================================
//Post user categories
//TODO:
//1- Post must include user id and categories ids
//2-Multiply categories can be post it
router.post('/cat', async (req, res) => {
  const newCat = req.body;
  try {
    const addCat = await DB.addCat(newCat);
    res.status(201).json({ message: addCat });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//==========================================================================
//Delete user categories
router.delete('/cat/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const addCat = await DB.removeCat(id);
    res.status(201).json({ message: addCat });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//==========================================================================
//Post user elegibility
//TODO:
//1- Post must include user id and elegibility ids
//2-Multiply elegibility can be post it
router.post('/eli', async (req, res) => {
  const newEleg = req.body;
  try {
    const addEle = await DB.addEli(newEleg);
    res.status(201).json({ message: addEle });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//==========================================================================
//Delete user categories
router.delete('/eli/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const addCat = await DB.removeEli(id);
    res.status(201).json({ message: addCat });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//==========================================================================

module.exports = router;
