var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
    socket.on('connected', function (person) {
        io.emit('connected', person);
    });
    socket.on('disconnect', function (person) {
        io.emit('disconnect', person);
    })

});



http.listen(3000, function () {
    console.log('listening on *:3000');
});