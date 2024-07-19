var router = require('express').Router();
const DEBUG = true;

if(DEBUG) {
    console.log('ROUTE: /api/bands');
}

// this file is the route for the bands api

const bandsRouter = require('./bands');
router.use('/bands', bandsRouter);

module.exports = router;