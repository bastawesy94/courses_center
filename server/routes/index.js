var express = require('express');
var router = express.Router();
// const Student = require('../models/student/user.model')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
