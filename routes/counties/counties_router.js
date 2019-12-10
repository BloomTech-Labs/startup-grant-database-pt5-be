const express = require('express');
const router = express.Router();
const db = require('./counties_model.js');

//Get all Counties
router.get('/', async (req,res) => {
    try {
        const counties = await db.find();
        res.status(200).json(counties);
    }
    catch (err) {
        res.status(500).json({message: 'There was an error with your request', Error: err.message})
    }
})

//Get Counties by state
router.get('/states', async (req,res) => {
    try {
        const queryParams = req.query.state;
        //Converting id to array in case there is a single state parameter in the query
        var id = typeof(queryParams) === 'string' ? queryParams.split() : queryParams;
        console.log('my id', id)
        const counties = await db.findbystate(id);
        res.status(200).json(counties);
    }
    catch (err) {
        res.status(500).json({message: 'There was an error with your request', Error: err.message})
    }
})

module.exports = router;