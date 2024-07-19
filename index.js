
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

app.use('/bands', bandsRouter);
app.use('/api', apiRouter);
app.use('/bandsAdd', bandsAddRouter);


app.get('/', (req, res) => {
    res.render('index.ejs');
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });

    




