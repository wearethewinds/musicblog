var express = require('express'),
	http = require('http'),
	port = process.env.PORT || 3000;

var app = express();
app.configure(function() {
	app.set('views', __dirname);
	app.engine('html', require('ejs').renderFile);
	app.use("/resources", express.static(__dirname + '/resources'));
});

app.get('/', function(req, res) {
	res.render('index.html');
});

app.get('/review', function(req, res) {
	res.render('review.html');
});

http.createServer(app).listen(port);
