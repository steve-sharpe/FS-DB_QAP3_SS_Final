// Import Express and create a router object for routing
const router = require('express').Router();
// Debug flag to enable logging for debugging purposes
const DEBUG = true;

// Check if debugging is enabled and log the route being accessed
if(DEBUG) {
    console.log('ROUTE: /bandsEdit');
}

// Define a GET route for /bandsEdit
router.get('/', (req, res) => {
    // Render the bandsEdit view/template when the route is accessed
    res.render('bandsEdit');
});

// Export the router to be used in other parts of the application
module.exports = router;