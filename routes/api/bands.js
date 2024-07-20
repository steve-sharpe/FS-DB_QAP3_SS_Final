const express = require('express');
const router = express.Router();
const bandsDal = require('../../services/pg.bands.dal');
const DEBUG = true;

router.get('/', async (req, res) => {
    try {
        let theBands = await bandsDal.getBands();
        res.render('bands', { bands: theBands });
    } catch (err) {
        console.error("Error fetching bands:", err);
        res.status(503).json({message: "Service Unavailable", error: err.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
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

router.get('/edit-band/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const band = await getBandById(id); // Fetch the band data using its ID

        if (!band) {
            return res.status(404).send('Band not found');
        }

        // Render the bandsEdit.ejs view, passing in the band data
        res.render('bandsEdit', { band });
    } catch (error) {
        console.error('Error fetching band:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        await bandsDal.addBand(req.body.band_name, req.body.band_singer, req.body.band_label, req.body.number_albums, req.body.favourite_album);
        // Render the bandsAddLanding.ejs view with a message
        res.render('bandsAddLanding', { message: "Band added successfully." });
    } catch (err) {
        console.error("Error adding band:", err);
        res.status(503).json({message: "Service Unavailable", error: err.message});

    }
});

router.put('/:id', async (req, res) => {
    try {
        await bandsDal.updateBand(req.params.id, req.body.band_name, req.body.band_singer, req.body.band_label, req.body.number_albums, req.body.favourite_album);
        res.render
    } catch (err) {
        console.error("Error updating band:", err);
        res.status(503).json({message: "Service Unavailable", error: err.message});
    }
});

// make a delete route with band_id as the PK

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await bandsDal.deleteBandByID(id);
        // Render the bandsDelete.ejs template
        res.render('bandsDelete', { message: "Band successfully deleted." });
    } catch (error) {
        console.error("Error deleting band:", error);
        // Render the bandsDelete.ejs template with error information
        res.render('bandsDelete', { message: "Service Unavailable", error: error.message });
    }
});

module.exports = router;