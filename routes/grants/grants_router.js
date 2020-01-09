const express = require("express");
const router = express.Router();
const db = require("./grants_model.js");

//==========================================================================
//GET last modify
// router.get('/mod', async (req, res) => {
//   try {
//     const grantResult = await db.getLastModify();
//     res.status(200).json(grantResult);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

//==========================================================================
//GET endpoint to ontain all grants

router.get("/", async (req, res) => {
  try {
    const grantResult = await db.find();
    res.status(200).json(grantResult);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST TO CREATE A NEW GRANT
router.post("/", async (req, res) => {
  const grant = req.body;
  try {
    const newGrant = await db.add(grant);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//==========================================================================
//GET grant by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const grantResult = await db.findById(id);
    res.status(200).json(grantResult);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//==========================================================================
//GET endpoint to obtain all grants matching state. counties, amount elegibility, and categories
router.get("/search", async (req, res) => {
  try {
    console.log("My request", req.query);
    const {
      state,
      county,
      minimumAmount,
      maximumAmount,
      eligibility,
      category
    } = req.query;
    const grantSearch = await db.masterSearch(
      state,
      county,
      minimumAmount,
      maximumAmount,
      eligibility,
      category
    );
    res.status(200).json(grantSearch);
  } catch (err) {
    res
      .status(500)
      .json({
        Message: "There was an error with your request",
        Error: err.message
      });
  }
});

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

router.post("/", async (req, res) => {
  const grant_info = req.body;
  try {
    const new_grant = await db.add(grant_info);
    res.status(200).json(new_grant);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

//Update grant post

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  //Date to pass to last modified
  const data = {
    grant_id: id,
    updated_at: new Date(),
    modification_description: newData
  };

  try {
    const updateGrant = await db.updateGrant(id, newData);
    if (updateGrant === 1) {
      //If succesful data will be also pass to last mod
      const lastMod = await db.lastModify(data);
      // console.log('Modified', lastMod);
      res.status(201).json({ message: updateGrant });
    } else {
      console.log("Not Found");
      res.status(404).json({ message: "No grant found under id" });
    }
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ message: err.message });
  }
});

//==========================================================================

module.exports = router;
