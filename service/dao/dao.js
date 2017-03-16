var mongoose = require('mongoose');
var conf = require('../config/config.js');

mongoose.connect(conf.get("db:url"), conf.get("db:options")).then(
	() => {console.log("Create connection to db")},
	(err) => {console.log("Connection error: " + err.message)}
);

var Schema = mongoose.Schema;

var Playlist = new Schema({
	name: String,
	audio: [String]
});

var Record = new Schema({
	userId: String,
	playlists: [Playlist]
});

var RecordModel = mongoose.model("Record", Record);

module.exports.RecordModel = RecordModel;