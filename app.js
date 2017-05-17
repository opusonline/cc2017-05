var express = require('express');
var path = require('path');
var ip = require('ip');
var bodyParser = require('body-parser');

var brewerydb = require('./routes.js');

var port = 9696;
var app = express();
var publicPath = path.join(__dirname, 'public');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(publicPath));

app.use('/beer', brewerydb);
app.use(errorHandler);

var server = app.listen(port, function () {

	var host = ip.address();
	var port = server.address().port;

	console.log('Server listening at http://localhost:%s and http://%s:%s', port, host, port);

});

function errorHandler(err, req, res, next) {
    res.status(500);
	res.json({
		'errorMessage': err.message + ' - Maybe because you have hit your API limit for the day (400 Requests Per Day)'
	});
}
