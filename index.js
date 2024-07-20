
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

app.get('/bands/:band_id', async (req, res) => {
    try {
        // Assuming getBandById is a function that fetches band information by ID
        const bandInfo = await getBandByBandId(req.params.band_id);
        if (!bandInfo) {
            // Handle case where no band is found for the given ID
            res.status(404).send('Band not found');
            return;
        }
        // Pass the fetched band information to the bandsEdit view
        res.render('bandsEdit', { band: bandInfo });
    } catch (error) {
        // Handle potential errors, such as database issues
        console.error('Error fetching band information:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });

    




