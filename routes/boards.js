var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:boardname', function(req, res) {
  res.render('board', { title: 'Express' });
});

module.exports = router;
