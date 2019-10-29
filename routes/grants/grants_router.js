const express = require('express');
const router = express.Router();
const db = require('./grants_model.js');

router.get('/', async (req,res) => {
    try {
        const grantResult = await db.find();
        res.status(200).json(grantResult);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
})


module.exports = router;