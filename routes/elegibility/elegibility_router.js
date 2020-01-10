const express = require("express");
const router = express.Router();

const db = require("./elegibility_model.js");

router.get("/", async (req, res) => {
  try {
    const elegibility = await db.find();
    res.status(200).json(elegibility);
  } catch (err) {
    res
      .status(500)
      .json({
        Message: "There was a problem with your request",
        Error: err.message
      });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const elegibility = await db.findById(id);
    res.status(200).json(elegibility);
  } catch (err) {
    res
      .status(500)
      .json({
        Message: "There was a problem with your request",
        Error: err.message
      });
  }
});

module.exports = router;
