const express = require("express");
const router = express.Router();
const db = require("./grants_model.js");

//GET endpoint to ontain all grants
router.get("/", async (req, res) => {
  try {
    const grantResult = await db.find();
    res.status(200).json(grantResult);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//GET endpoint to obtain all grants matching state. counties, amount elegibility, and categories
router.get("/search", async (req, res) => {
  try {
    const {
      state,
      counties,
      minimumAmount,
      maximumAmount,
      eligibility,
      category
    } = req.query;
    console.log(
      "minimum",
      minimumAmount,
      state,
      counties,
      maximumAmount,
      eligibility,
      category
    );

    // console.log(req.query);

    const grantSearch = await db.masterSearch(
      state,
      counties,
      minimumAmount,
      maximumAmount,
      eligibility,
      category
    );
    res.status(200).json(grantSearch);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      Message: "There was an error with your request",
      Error: err.message
    });
  }
});

router.post('/', async (req,res) => {
  const grant_info = req.body
  try{
    const new_grant = await db.add(grant_info);
    res.status(200).json(new_grant)
  } catch(err){
      console.error(err)
      res.status(500).json(err.message)   
  }
})

module.exports = router;
