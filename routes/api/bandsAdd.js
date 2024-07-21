const router = require('express').Router();
const DEBUG = true;

if(DEBUG) {
    console.log('ROUTE: /bandsAdd');
}

router.get('/', (req, res) => {
    res.render('bandsAdd');
    });


module.exports = router;