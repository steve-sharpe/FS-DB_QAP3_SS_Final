const router = require('express').Router();
const DEBUG = true;



if(DEBUG) {
    console.log('ROUTE: /bandsEdit');
}

router.get('/', (req, res) => {
    res.render('bandsEdit');
    });



    // router.post('/update-band/:band_id', async (req, res) => {
    //     console.log("Request body:", req.body); // Debugging: Log request body
    //     const { band_name, band_singer, band_label, number_albums, favourite_album } = req.body;
    //     const { band_id } = req.params; // Extract band_id from URL parameters
    
    //     // Validate required fields
    //     if (!band_id) {
    //         return res.status(400).send("Band ID is required.");
    //     }
    //     if (!band_name) {
    //         return res.status(400).send("Band name is required.");
    //     }
    //     // Example of additional validation for other fields
    //     if (!band_singer) {
    //         return res.status(400).send("Band singer is required.");
    //     }
    //     if (!band_label) {
    //         return res.status(400).send("Band label is required.");
    //     }
    //     if (number_albums !== undefined && isNaN(number_albums)) {
    //         return res.status(400).send("Number of albums must be a number.");
    //     }
    //     if (!favourite_album && number_albums > 0) { // Assuming a favourite album is required if there are albums
    //         return res.status(400).send("Favourite album is required when number of albums is greater than 0.");
    //     }
    
    //     try {
    //         // Call the updateBand function from the DAL service
    //         await updateBand(band_id, band_name, band_singer, band_label, number_albums, favourite_album); 
    //         // Redirect to a page listing all bands, for example
    //         res.redirect('bandsEditLanding');
    //     } catch (error) {
    //         console.error("Error updating band:", error);
    //         res.status(500).send("Error updating band.");
    //     }
    // });


module.exports = router;