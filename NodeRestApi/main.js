var restify = require('restify');
var fs = require('fs');

var notifications = [];
//var notifications = {};

function add(req, res, next) {
    notifications.push(req.params.notification);
    // notifications.title = 'ein Titel';
    // notifications.message = req.params.notification;

    // console.log(notifications);

    res.send('added: ' + req.params.notification);
    console.log('add(): ' + req.params.notification);
    next();
}

function retrieve(req, res, next) {
    res.send(notifications);
    if (notifications.length > 0) {
        console.log('retrieve(): ' + notifications);
    }
    notifications = [];
    next();
}

var https_options = {
    key: fs.readFileSync('ssl/thinking-aloud.key'),
    certificate: fs.readFileSync('ssl/thinking-aloud.cert')
};

var server = restify.createServer(https_options);
// var server = restify.createServer();

server.get('/getNotifications', retrieve);
server.head('/getNotifications', retrieve);

server.post('/setNotification/:notification', add);
server.head('/setNotification/:notification', add);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
