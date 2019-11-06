const express = require("express");
const db = require("./user-model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await db.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users" });
  }
});

//BELOW WAS FOR DEBUGGING
// router.get("/test", async (req, res) => {
//   try {
//     const users = await db.findByUserType("0");
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// });

module.exports = router;
