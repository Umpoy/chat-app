var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var randomWords = require('random-words');
var users = {};
var usersArray = [];

var wordsArray = randomWords(9);

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// io.on('connection', (client) => {
//     client.on('subscribeToTimer', (interval) => {
//         console.log('client is subscribing to timer with interval ', interval);
//         setInterval(() => {
//             client.emit('timer', new Date());
//         }, interval);
//     });
// });

io.on('connection', socket => {
    // socket.on('chat message', msg => {
    //     io.emit('chat message', msg);
    // });

    socket.on('connected', name => {
        io.emit('connected', name);
        console.log('connected ', name)
        users[socket.id] = { name }
        users[socket.id].words = wordsArray.splice(0, 3);
        io.emit('grabUsers', users);
        console.log('key: ', getKeyByValue(users, users[socket.id]));
        usersArray.push(users[socket.id]);
    });

    // socket.on("start", (data) => {

    // });

    socket.on('message', () => {
        io.sockets.emit('private', { msg: 'hello', user: users[Object.keys(users)[0]] })
    })


    socket.on('disconnect', () => {
        io.emit('disconnect', users[socket.id]);


        var index = usersArray.indexOf(users[socket.id]);
        if (index > -1) {
            usersArray.splice(index, 1);
        }
        // usersArray = [2, 9]
        console.log(usersArray);
        delete users[socket.id]

    });
    // socket.on('typing', () => {
    //     let hello = 'hello';
    //     io.emit('typing', hello);
    // });

});


http.listen(3000, () => {
    console.log('listening on *:3000');
});