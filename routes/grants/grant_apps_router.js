const express = require("express");
const router = express.Router();
const DB = require("./grant_apps_model.js");

// below returns all saved grants for testing purposes
router.get("/", async (req, res) => {
  try {
    const allSaved = await DB.find();
    res.status(200).json(allSaved);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// below finds a grant for a specific user with route params
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const savedGrants = await DB.findById(id);
    res.status(200).json(savedGrants);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/", async (req, res) => {
  const app = req.body;
  try {
    const newApplication = await DB.add(app);
    res.status(201).json(newApplication);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/statuses", async (req, res) => {
  const statusEntry = req.body;
  try {
    const status = await DB.createStatus(statusEntry);
    res.status(201).json(status);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
