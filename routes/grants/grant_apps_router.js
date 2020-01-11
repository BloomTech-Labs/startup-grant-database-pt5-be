const express = require('express');
const router = express.Router();
const DB = require('./grant_apps_model.js');

// below returns all saved grants solely
// for testing purposes
router.get('/', async (req, res) => {
  try {
    const allSaved = await DB.find();
    res.status(200).json(allSaved);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all applications for a current grantor
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const applications = await DB.findById(id);
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post('/', async (req, res) => {
  const app = req.body;
  try {
    const newApplication = await DB.add(app);
    res.status(201).json(newApplication);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedStatus = await DB.updateStatus(id, status);
    res.status(200).json(updatedStatus);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
