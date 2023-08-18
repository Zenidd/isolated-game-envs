var express = require('express');
var router = express.Router();
const authMiddleware = require('./auth-middleware');
router.use(authMiddleware);

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('index', { title: 'Hexstation API' });
});

module.exports = router;
