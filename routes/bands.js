const express = require('express');
const router = express.Router();
const dal = require("../../services/pg.bands.dal");

router.get('/', async (req, res) => {
    try {
        const bands = await dal.getBands();
        if (DEBUG) console.table(bands);
        res.json(bands);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

router.get('/:id', async (req, res) => {
    try {
        const band = await dal.getBandByBandId(req.params.id);
        if (DEBUG) console.table(band);
        res.json(band);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

router.post('/', async (req, res) => {
    try {
        const band = await dal.addBand(req.body.band_name, req.body.band_singer, req.body.band_label, req.body.number_albums, req.body.favourite_album);
        if (DEBUG) console.table(band);
        res.json(band);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

router.put('/:id', async (req, res) => {
    try {
        const band = await dal.putBand(req.params.id, req.body.band_name, req.body.band_singer, req.body.band_label, req.body.number_albums, req.body.favourite_album);
        if (DEBUG) console.table(band);
        res.json(band);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

router.patch('/:id', async (req, res) => {
    try {
        const band = await dal.patchBand(req.params.id, req.body.band_name, req.body.band_singer, req.body.band_label, req.body.number_albums, req.body.favourite_album);
        if (DEBUG) console.table(band);
        res.json(band);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

router.delete('/:id', async (req, res) => {
    try {
        const band = await dal.deleteBand(req.params.id);
        if (DEBUG) console.table(band);
        res.json(band);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

module.exports = router;
