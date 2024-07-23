// Import Express and create a router object
const router = require('express').Router();
// Debug flag to control logging
const DEBUG = true;

// Log the route when in debug mode
if(DEBUG) {
    console.log('ROUTE: /bandsAdd');
}

// Define a GET route for /bandsAdd
router.get('/', (req, res) => {
    // Render the bandsAdd view/template
    res.render('bandsAdd');
});

// Export the router for use in the main app
module.exports = router;