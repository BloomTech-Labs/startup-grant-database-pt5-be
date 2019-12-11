const router = require('express').Router();
//Connect to usersmodel
const DB = require('./savedGrants_model');

//==========================================================================
// Get all saved grants (All users)
router.get('/', async (req, res) => {
  try {
    const allGrants = await DB.find();
    res.status(200).json({ message: 'Success!', allGrants });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//==========================================================================
// Get all saved grants for specific user
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const allMyGrants = await DB.findById(id);
    res.status(200).json(allMyGrants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//==========================================================================
// Ability for user to Save grants

router.post('/', async (req, res) => {
  const myGrants = req.body;
  try {
    const saveToMyGrants = await DB.add(myGrants);
    console.log(saveToMyGrants);
    res.status(200).json({ message: 'Saved successful.', id: saveToMyGrants });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//==========================================================================
module.exports = router;
