var express = require('express');
var RecordModel = require('../dao/dao.js').RecordModel;

var router = express.Router();

router.get('/', function(req, res, next) {
  RecordModel.findOne({userId: req.user.mid}, 'playlists._id playlists.name', function(err, record) {
  	if (err) { 
  		console.log(err);
  		res.json({error: 'oops'});
  	} else {
			res.json(record.playlists);
		}
  });	
});

router.post('/', function(req, res, next) {
	console.log(req.user);
	var name = req.body.playlist;
	var audio = req.body.audio ? req.body.audio : [];
	RecordModel.findOneAndUpdate(
		{
			userId: req.user.mid
		}, 
		{
			$push: {"playlists": {"name": name, "audio": audio}}
		}, 
		{
			new: true,
			upsert: true,
			fields: 'playlists._id playlists.name',
		},
		function(err, record) {
	  	if (err) { 
	  		console.log(err);
	  		res.json({error: 'oops'});
	  	} else {
				res.json(record.playlists);
			}
	  });
	
});

router.get('/:id', function(req, res, next) {
	res.json({});	
});

router.post('/:id', function(req, res, next) {
	res.json({});	
});

router.put('/:id', function(req, res, next) {
	res.json({});	
});

router.delete('/:id', function(req, res, next) {
	res.json({});	
});

module.exports = router;
