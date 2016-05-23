var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/microwavesam', function(req, res, next) {
  res.render('microwavesam', { title: 'MicrowaveSam',
  								microwavesam: 'kitchen appliance' });
});

module.exports = router;
