var restify = require('restify');
var fs = require('fs');

var notifications = []; // holds all the notification

// add a notification in json format
function addNotification(req, res, next) {
    var json = JSON.parse(req._body);

    var tmp = {};
    tmp.title = json.title;
    tmp.message = json.message;

    notifications.push(tmp);

    res.send('entry added()');
    next();
}

// retrieve all notifications in json format
function retrieveNotifications(req, res, next) {
    res.contentType = 'json';
    res.send(notifications);

    notifications = [];
    next();
}

// load ssl cert and key
var https_options = {
    key: fs.readFileSync('ssl/thinking-aloud.key'),
    certificate: fs.readFileSync('ssl/thinking-aloud.cert')
};

// setup REST Server and accept json
var server = restify.createServer(https_options); // run with SSL
//var server = restify.createServer(); // run without SSL

server.use(restify.acceptParser(server.acceptable));
server.use(restify.jsonp());
server.use(restify.bodyParser({mapParams: false}));

// defines the rest calls
server.get('/getNotifications', retrieveNotifications);
server.head('/getNotifications', retrieveNotifications);
server.post('/setNotification/:notification', addNotification);
server.head('/setNotification/:notification', addNotification);

// starts the server
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});