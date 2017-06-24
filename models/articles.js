var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		require: false
	}

});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;