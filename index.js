var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {}
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    var name;

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });

    socket.on('connected', person => {
        name = String(person)
        io.emit('connected', person);
        console.log('connect')
        users[socket.id] = person
        console.log(users)
    });

    // socket.on('disconnect', () => {
    //     io.emit('disconnect', users[socket.id]);
    //     delete users[socket.id]
    //     console.log(users);
    // });
    // socket.on('typing', () => {
    //     let hello = 'hello';
    //     io.emit('typing', hello);
    // });

});


http.listen(3000, () => {
    console.log('listening on *:3000');
});