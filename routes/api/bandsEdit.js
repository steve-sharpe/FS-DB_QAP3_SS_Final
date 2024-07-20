const router = require('express').Router();
const DEBUG = true;

if(DEBUG) {
    console.log('ROUTE: /bandsEdit');
}

router.get('/', (req, res) => {
    res.render('bandsEdit');
    });

module.exports = router;