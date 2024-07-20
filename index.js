
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

const DEBUG = true;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));


const bandsRouter = require('./routes/api/bands');
const apiRouter = require('./routes/api');
const bandsAddRouter = require('./routes/api/bandsAdd');
const bandsEditRouter = require('./routes/api/bandsEdit');
const { getBandByBandId } = require('./services/pg.bands.dal');
const { addBand } = require('./services/pg.bands.dal');

app.use('/bands', bandsRouter);
app.use('/api', apiRouter);
app.use('/bandsAdd', bandsAddRouter);
app.use('/bandsEdit', bandsEditRouter);


app.get('/', (req, res) => {
    res.render('index.ejs');
    });

app.get('/bands/:band_id', async (req, res) => {
    res.render('bandsEdit');
    });

app.get('/bands/edit/:band_id', async (req, res) => {
    const bandId = req.params.band_id;
    const band = await getBandByBandId(bandId);
    res.render('bandsEdit', { band });
    });

app.post('/band', async (req, res) => {
    const { band_name, band_singer, band_label, number_albums, favourite_album } = req.body;
    // Ensure band_name is not null or undefined
    if (!band_name) {
        return res.status(400).send("Band name is required.");
    }
    try {
        await addBand(band_name, band_singer, band_label, number_albums, favourite_album);
        res.render('bandsAdd');
    } catch (error) {
        console.error("Error adding band:", error);
        res.status(500).send("Error adding band.");
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });

    




