// Require npm packages
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
// var expressHandle = require("express-handlebars");
var mongoose = require("mongoose");
var cheerio = require("cheerio");

// Require our Article Model
var Article = require("./models/articles.js");
// set mogoose to leverage built in JS ES6 promises
mongoose.Promise = Promise;
//Init express
var app = express();
// using body-parser with app
app.use(bodyParser.urlencoded({
  extended: false
}));

// make public a static dir
app.use(express.static("public"));

// database configs with mongoose

mongoose.connect("mongodb://localhost/newsarticles");
var db = mongoose.connection;

db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});


db.once("open", function() {
	console.log("Mongoose connection succesful.");
});


// ROUTES ==============================================
// =====================================================

// GET ROUTE TO SCRAPE INFO

app.get("/scrape", function(req, res) {
	request("https://news.google.com/news/section?cf=all&pz=1&ned=us&topic=s&siidp=e555c1d79229aac1bb6eca367dfadf4f9462&ict=ln", function(error, response, html) {	
	

	

		var $ = cheerio.load(html);
		var result = [];

		$("h2.article").each(function(i, element) {
			
			result.title = $(this).text();

		$("div.esc-lead-snippet-wrapper").each(function(i, element) {	

			result.text = $(this).text();

			var entry = new Article(result);

			entry.save(function(err, doc) {
				if (err) {
					console.log(err);
				} 
				else {
					console.log(doc);
				}
			});//ENTRY
		});//DIV
		
	});//H2

	});//REQUEST

	res.send("scrapey scrape!!");

});//APP.GET

// ARTICLE ROUTES ========================================================
	app.get("/articles", function(req, res) {
  // Grab every doc in the Articles array
 	 Article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});






//Heroku mLab URI
//mongodb://heroku_3twx78t3:ur7stilmb4vv3t0pi5tfnplfqe@ds125262.mlab.com:25262/heroku_3twx78t3

app.listen(3001, function() {
	console.log("App running on port 3001!");
});