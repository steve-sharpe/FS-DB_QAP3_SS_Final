// Import necessary modules
const express = require('express');
const router = express.Router();
const bandsDal = require('../../services/pg.bands.dal');

// Route to get all bands
router.get('/', async (req, res) => {
    try {
        let theBands = await bandsDal.getBands(); // Fetch all bands
        res.render('bands', { bands: theBands }); // Render bands page with fetched bands
    } catch (err) {
        console.error("Error fetching bands:", err);
        res.status(503).json({message: "Service Unavailable", error: err.message}); // Handle errors
    }
});

// Route to get a specific band by ID
router.get('/:id', async (req, res) => {
    try {
        let theBand = await bandsDal.getBandByBandId(req.params.id); // Fetch band by ID
        if (theBand.length === 0) {
            res.status(404).json({message: "Band not found"}); // Band not found
        } else {
            res.json(theBand); // Return found band
        }
    } catch (err) {
        console.error("Error fetching band by ID:", err);
        res.status(503).json({message: "Service Unavailable", error: err.message}); // Handle errors
    }
});

// Route to render edit page for a specific band
router.get('/edit-band/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const band = await getBandById(id); // Fetch band by ID

        if (!band) {
            return res.status(404).send('Band not found'); // Band not found
        }

        res.render('bandsEdit', { band }); // Render edit page for the found band
    } catch (error) {
        console.error('Error fetching band:', error);
        res.status(500).send('Internal Server Error'); // Handle errors
    }
});

// Route to add a new band
router.post('/', async (req, res) => {
    try {
        await bandsDal.addBand(req.body.band_name, req.body.band_singer, req.body.band_label, req.body.number_albums, req.body.favourite_album); // Add new band
        res.render('bandsAddLanding', { message: "Band added successfully." }); // Render success message
    } catch (err) {
        console.error("Error adding band:", err);
        res.render('bandsDelete', { message: "Error deleting band." }); // Handle errors
    }
});

// Route to update a band using PUT method
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { band_name, band_singer, band_label, number_albums, favourite_album } = req.body;
        await bandsDal.updateBand(id, band_name, band_singer, band_label, number_albums, favourite_album); // Update band
        res.render('bandsEditLanding', { message: "Band successfully updated." }); // Render success message
    } catch (error) {
        console.error("Error updating band:", error);
        res.render('bandsEditLanding', { message: "Error updating band." }); // Handle errors
    }
});

// Route to update a band using PATCH method
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { band_name, band_singer, band_label, number_albums, favourite_album } = req.body;
        await bandsDal.updateBand(id, band_name, band_singer, band_label, number_albums, favourite_album); // Update band
        res.render('bandsEditLanding', { message: "Band successfully updated." }); // Render success message
    } catch (error) {
        console.error("Error updating band:", error);
        res.render('bandsEditLanding', { message: "Error updating band." }); // Handle errors
    }
});

// Route to delete a band
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await bandsDal.deleteBandByID(id); // Delete band by ID
        res.render('bandsDelete', { message: "Band successfully deleted." }); // Render success message
    } catch (error) {
        console.error("Error deleting band:", error);
        res.render('bandsDelete', { message: "Error deleting band." }); // Handle errors
    }
});

// Export the router
module.exports = router;