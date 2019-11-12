const express = require('express');
const router = express.Router();

const db = require('./categories_model.js');

router.get('/', async (req , res) => {
    try {
        const categories = await db.find();
        res.status(200).json(categories);
    }
    catch (err) {
        res.status(500).json({message: 'There was an error with your request', Error: err.message});
    }
})

module.exports = router;