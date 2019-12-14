const express = require("express");
const router = express.Router();
const DB = require("./grant_apps_model.js");

// below returns all saved grants for testing purposes
router.get("/", async (req, res) => {
  try {
    const saved = await DB.find();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/:id/saved", async (req, res) => {});

module.exports = router;
