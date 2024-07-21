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
        res.render('bandsDelete', { message: "Error deleting band." });
    }
});

router.post('/band/add', async (req, res) => {
    try {
        await bandsDal.addBand(req.body.band_name, req.body.band_singer, req.body.band_label, req.body.number_albums, req.body.favourite_album);
        // Render the bandsAddLanding.ejs view with a message
        res.render('bandsAddLanding', { message: "Band added successfully." });
    } catch (err) {
        console.error("Error adding band:", err);
        res.render('bandsDelete', { message: "Error deleting band." });
    }
});

router.post('/band', async (req, res) => {
    const { band_name, band_singer, band_label, number_albums, favourite_album } = req.body;
    // Ensure band_name is not null or undefined
    if (!band_name) {
        return res.status(400).send("Band name is required.");
    }
    try {
        await addBand(band_name, band_singer, band_label, number_albums, favourite_album);
        res.render('bandsAddLanding');
    } catch (error) {
        console.error("Error adding band:", error);
        res.status(500).send("Error adding band.");
    }
});

router.post('/update-band/:band_id', async (req, res) => {
    console.log("Request body:", req.body); // Debugging: Log request body
    const { band_name, band_singer, band_label, number_albums, favourite_album } = req.body;
    const { band_id } = req.params; // Extract band_id from URL parameters

    // Validate required fields
    if (!band_id) {
        return res.status(400).send("Band ID is required.");
    }
    if (!band_name) {
        return res.status(400).send("Band name is required.");
    }
    // Example of additional validation for other fields
    if (!band_singer) {
        return res.status(400).send("Band singer is required.");
    }
    if (!band_label) {
        return res.status(400).send("Band label is required.");
    }
    if (number_albums !== undefined && isNaN(number_albums)) {
        return res.status(400).send("Number of albums must be a number.");
    }
    if (!favourite_album && number_albums > 0) { // Assuming a favourite album is required if there are albums
        return res.status(400).send("Favourite album is required when number of albums is greater than 0.");
    }

    try {
        // Call the updateBand function from the DAL service
        await updateBand(band_id, band_name, band_singer, band_label, number_albums, favourite_album); 
        // Redirect to a page listing all bands, for example
        res.redirect('bandsEditLanding');
    } catch (error) {
        console.error("Error updating band:", error);
        res.status(500).send("Error updating band.");
    }
});

// make a put route with band_id as the PK

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { band_name, band_singer, band_label, number_albums, favourite_album } = req.body;
        await bandsDal.updateBand(id, band_name, band_singer, band_label, number_albums, favourite_album);
        // go to the bandsEditLanding.ejs template with a message
        res.render('bandsEditLanding', { message: "Band successfully updated." });
    } catch (error) {
        console.error("Error updating band:", error);
        // Render the bandsEditLanding.ejs template with error information
        res.render('bandsEditLanding', { message: "Error updating band." });
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
        res.render('bandsDelete', { message: "Error deleting band." });
    }
});

module.exports = router;