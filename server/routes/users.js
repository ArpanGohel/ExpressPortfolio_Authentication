/*COMP 229-Express Portfolio Authentication - Student name: Arpan Gohel - StudentID:300565463 - Oct26,2022*/

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
