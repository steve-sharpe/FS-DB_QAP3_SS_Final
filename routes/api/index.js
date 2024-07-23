var router = require('express').Router(); // Import Express router
const DEBUG = true; // Debug flag for logging

// Log current route if DEBUG is true
if(DEBUG) {
    console.log('ROUTE: /api/bands');
}

// Import and use router for bands API
const bandsRouter = require('./bands');
router.use('/bands', bandsRouter); // Route for handling bands

// Import and use router for bandsAdd API
const bandsAddRouter = require('./bandsAdd');
router.use('/bandsAdd', bandsAddRouter); // Route for adding bands

// Import and use router for bandsEdit API
const bandsEditRouter = require('./bandsEdit');
router.use('/bandsEdit', bandsEditRouter); // Route for editing bands

module.exports = router; // Export the router