var express = require('express');
var router = express.Router();


/* Server deployments */
router.post('/trigger', function(req, res, next) {
  res.send('Deployment trigger')
});

router.get('/status', function(req, res, next) {
  res.send('Deployment status')
});



module.exports = router;
