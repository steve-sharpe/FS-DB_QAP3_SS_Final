const router = require('express').Router();
const DEBUG = true;
const { updateBand } = require('../../services/pg.bands.dal');


if(DEBUG) {
    console.log('ROUTE: /bandsEdit');
}

router.get('/', (req, res) => {
    res.render('bandsEdit');
    });

router.post('/update-band/', async (req, res) => {
    console.log("Request body:", req.body); // Debugging: Log request body
    const { band_id, band_name, band_singer, band_label, number_albums, favourite_album } = req.body;
    if (!band_id) {
        return res.status(400).send("Band ID is required.");
    }
    if (!band_name) {
        return res.status(400).send("Band name is required.");
    }
    try {
        await updateBand(band_id, band_name, band_singer, band_label, number_albums, favourite_album);
        res.redirect('bandsEditLanding');
    } catch (error) {
        console.error("Error updating band:", error);
        res.status(500).send("Error updating band.");
    }
});


module.exports = router;