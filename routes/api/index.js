var router = require('express').Router();
const DEBUG = true;

if(DEBUG) {
    console.log('ROUTE: /api/bands');
}

// this file is the route for the bands api

const bandsRouter = require('./bands');
router.use('/bands', bandsRouter);

// this file is the route for the bandsAdd api

const bandsAddRouter = require('./bandsAdd');
router.use('/bandsAdd', bandsAddRouter);

// this file is the route for the bandsEdit api

const bandsEditRouter = require('./bandsEdit');
router.use('/bandsEdit', bandsEditRouter);



module.exports = router;