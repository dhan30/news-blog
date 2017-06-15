var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	text: {
		type: String,
		require: false
	}

});

var Article = mongoose.model("Artiicle", ArticleSchema);

module.exports = Article;