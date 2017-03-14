var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { VK_APP_ID: req.app_id, user:  req.user});
});

module.exports = router;
