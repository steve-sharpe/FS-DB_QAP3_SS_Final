// QAP3 Database & Fullstack Development
// Steve Sharpe 
// July 23, 2024

// Import necessary libraries
const express = require('express');
const methodOverride = require('method-override');

// Initialize express app
const app = express();
const port = 3000;

// Debug flag for development use
const DEBUG = true;

// Set view engine to EJS for template rendering
app.set('view engine', 'ejs');

// Middleware setup
app.use(express.static('public')); // Serve static files from 'public' directory
app.use(methodOverride('_method')); // Allow HTML forms to use PUT and DELETE methods
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Import routers and services
const bandsRouter = require('./routes/api/bands');
const apiRouter = require('./routes/api');
const bandsAddRouter = require('./routes/api/bandsAdd');
const bandsEditRouter = require('./routes/api/bandsEdit');
const { getBandByBandId, getBandByBandId2, addBand, updateBand, deleteBand } = require('./services/pg.bands.dal');

// Use routers for specific paths
app.use('/bands', bandsRouter);
app.use('/api', apiRouter);
app.use('/bandsAdd', bandsAddRouter);
app.use('/bandsEdit', bandsEditRouter);
app.use('/bandsEditLanding', bandsEditRouter);
app.use('/bandsAddLanding', bandsAddRouter);

// Route for homepage
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// Route for displaying band edit form
app.get('/bands/:band_id', async (req, res) => {
    res.render('bandsEdit');
});

// Route for fetching a band's details for editing
app.get('/bands/edit/:band_id', async (req, res) => {
    const bandId = req.params.band_id;
    const band = await getBandByBandId(bandId);
    res.render('bandsEdit', { band });
});

// Route for updating a band's information
app.post('/update-band', async (req, res) => {
    const { band_id, band_name, band_singer, band_label, number_albums, favourite_album } = req.body;
    try {
        await updateBand(band_id, band_name, band_singer, band_label, number_albums, favourite_album);
        res.redirect('/bands'); // Redirect to bands listing
    } catch (error) {
        console.error("Error updating band:", error);
        res.status(500).send("Error updating the band.");
    }
});

// Route for deleting a band
app.delete('/bands/:band_id', async (req, res) => {
    const bandId = req.params.band_id;
    try {
        await deleteBand(bandId);
        res.redirect('/bands'); // Redirect to bands listing
    } catch (error) {
        console.error("Error deleting band:", error);
        res.status(500).send("Error deleting the band.");
    }
});

// Route for partially updating a band's information
app.patch('/bands/:band_id', async (req, res) => {
    const bandId = req.params.band_id;
    const { band_name, band_singer, band_label, number_albums, favourite_album } = req.body;
    try {
        await updateBand(bandId, band_name, band_singer, band_label, number_albums, favourite_album);
        res.redirect('/bands'); // Redirect to bands listing
    } catch (error) {
        console.error("Error updating band:", error);
        res.status(500).send("Error updating the band.");
    }
});

// Route for adding a new band
app.post('/band', async (req, res) => {
    const { band_name, band_singer, band_label, number_albums, favourite_album } = req.body;
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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});