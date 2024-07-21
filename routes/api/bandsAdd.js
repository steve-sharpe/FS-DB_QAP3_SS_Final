const router = require('express').Router();
const DEBUG = true;

if(DEBUG) {
    console.log('ROUTE: /bandsAdd');
}

router.get('/', (req, res) => {
    res.render('bandsAdd');
    });

router.post('/', async (req, res) => {
    const { band_name, band_singer, band_label, number_albums, favourite_album } = req.body;
    // Ensure band_name is not null or undefined
    if (!band_name) {
        return res.status(400).send("Band name is required.");
    }
    try {
        await addBand(band_name, band_singer, band_label, number_albums, favourite_album);
        res.redirect('bandsAddLanding');
    } catch (error) {
        console.error("Error adding band:", error);
        res.status(500).send("Error adding band.");
    }
});


module.exports = router;