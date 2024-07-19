
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

app.use('/bands', bandsRouter);
app.use('/api', apiRouter);


app.get('/', (req, res) => {
    res.render('index.ejs');
    });

app.post('/bandDelete', async (req, res) => {
    const bandId = req.body.band_id;
    try {
        // Assuming deleteBandById is a function that deletes a band by ID and returns a result
        await deleteBand(bandId);
        res.send(`Band with ID ${bandId} deleted successfully.`);
    } catch (error) {
        // Log the error and send an error response
        console.error(`Error deleting band with ID ${bandId}:`, error);
        res.status(500).send(`Failed to delete band with ID ${bandId}.`);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });

    




