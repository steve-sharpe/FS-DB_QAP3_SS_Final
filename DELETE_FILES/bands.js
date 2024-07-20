const express = require('express');
const router = express.Router();
const bandsDal = require('../../services/pg.bands.dal');
const DEBUG = true;
const { deleteBandById } = require('../../services/pg.bands.dal');

router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/bands GET');
    try {
        let theBands = await bandsDal.getBands();
        res.json(theBands);
    } catch (err) {
        console.error("Error fetching bands:", err);
        res.status(503).json({message: "Service Unavailable", error: err.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        if(DEBUG) console.log('ROUTE: /api/bands GET id: ' + req.params.id);
        let theBand = await bandsDal.getBandByBandId(req.params.id);
        if (theBand.length === 0) {
            res.status(404).json({message: "Band not found"});
        } else {
            res.json(theBand);
        }
    } catch (err) {
        console.error("Error fetching band by ID:", err);
        res.status(503).json({message: "Service Unavailable", error: err.message});
    }
});

router.post('/', async (req, res) => {
    try {
        if(DEBUG) console.log('ROUTE: /api/bands POST');
        await bandsDal.addBand(req.body.band_name, req.body.band_singer, req.body.band_label, req.body.number_albums, req.body.favourite_album);
        res.status(201).json({message: "Band added"});
    } catch (err) {
        console.error("Error adding band:", err);
        res.status(503).json({message: "Service Unavailable", error: err.message});
    }
});

router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/bands PUT id: ' + req.params.id);
    try {
        await bandsDal.updateBand(req.params.id, req.body.band_name, req.body.band_singer, req.body.band_label, req.body.number_albums, req.body.favourite_album);
        res.status(200).json({message: "Band updated"});
    } catch (err) {
        console.error("Error updating band:", err);
        res.status(503).json({message: "Service Unavailable", error: err.message});
    }
});

router.delete('/bands/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await deleteBandById(id);
        res.redirect('/bands'); // Redirect back to the bands page or wherever appropriate
    } catch (error) {
        console.error('Failed to delete band:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;

module.exports = router;