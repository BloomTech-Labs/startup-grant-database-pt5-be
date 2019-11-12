const express = require('express');
const router = express.Router();
const db = require('./states_model.js');

router.get('/', async (req,res) => {
    try {
        const states = await db.find();
        res.status(200).json(states);
    }
    catch (err) {
        res.status(500).json({message: 'There was a problem with your request', Error: err.message});
    }
})

module.exports = router;