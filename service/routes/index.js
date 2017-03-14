var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.cookies);
	if (checkAuth(req.cookies['vk_app_' + req.app.VK_APP_ID])) {
		res.render('audio');
	} else {
  	res.render('index', { title: 'Express' });
	}
});

function checkAuth(cookieString) {
	return false;
}

module.exports = router;
