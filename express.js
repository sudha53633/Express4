ExpressJS is one of the most well known packages for Node.js. It is a web development framework that helps us create the great applications. It is also the E in the MEAN stack (MongoDB, ExpressJS, AngularJS, Node.js).

Just a few days ago, the Express repo released Express version 4.0.0-rc1. We’ll look at the main differences between ExpressJS 4.0 and ExpressJS 3.0. There are a good amount of changes that have taken place which will require us to change the way our MEAN stack apps are setup.

Removed Bundled Middleware

The bundled middleware with Express are the things we use to configure our application. They were things like bodyParser, cookieParser, session, and others.


They were removed into their own modules so that they could receive fixes, updates, and releases without impacting the main express release cycles.

ExpressJS 3.0

In an Express 3.0 application, we would use app.configure() to set up the middleware we would need.

For an example, here is our configuration of our package.json and server.js files that start our Node app from our Starter MEAN Stack Application.

// package.json (Express 3.0)
{
  "name": "starter-node-angular",
  "main": "server.js",
  "dependencies": {
    "express": "~3.4.8"
  }
}

// server.js (Express 3.0)
var express = require('express');
var app     = express();

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 					// log every request to the console
	app.use(express.bodyParser()); 						// pull information from html in POST
	app.use(express.methodOverride()); 					// simulate DELETE and PUT
});

app.listen(8080);	
console.log('Magic happens on port 8080'); 			// shoutout to the user

ExpressJS 4.0

Now in Express 4.0, all middleware (except static) have been removed and will need to be called separately. These middleware dependencies were included in the Connect package. Since connect is no longer a dependency, we will have to call the middleware ourselves. Here is a table of all the middleware that came with 3.0 and what it is now called.

Express 3.0 Name	Express 4.0 Name
bodyParser	body-parser
compress	compression
cookieSession	cookie-session
logger	morgan
cookieParser	cookie-parser
session	express-session
favicon	static-favicon
response-time	response-time
error-handler	errorhandler
method-override	method-override
timeout	connect-timeout
vhost	vhost
csrf	csurf
Now to have our exact same setup from Express 3.0 carried over to Express 4.0, we will add our modules needed to package.json and update our server.js files.

// package.json (Express 4.0)
{
  "name": "starter-node-angular",
  "main": "server.js",
  "dependencies": {
    "express": "~4.0.0",
    "morgan": "~1.0.0",
    "body-parser": "~1.0.0",
    "method-override": "~1.0.0"
  }
}

// server.js (Express 4.0)
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();

app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser.urlencoded({ extended: false }))    // parse application/x-www-form-urlencoded
app.use(bodyParser.json())    // parse application/json
app.use(methodOverride()); 					// simulate DELETE and PUT

app.listen(8080);	
console.log('Magic happens on port 8080'); 			// shoutout to the user

Removed app.configure()

app.configure() is no longer available and in order to configure routes based on environments, just use a simple if statement.


app.configure('development', function() {
   // configure stuff here
});

// turns into

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
   // configure stuff here
}
