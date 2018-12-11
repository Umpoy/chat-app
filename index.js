var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var randomWords = require('random-words');
var users = {}

var wordsArray = randomWords(12);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            client.emit('timer', new Date());
        }, interval);
    });
});

// io.on('connection', socket => {
//     // socket.on('chat message', msg => {
//     //     io.emit('chat message', msg);
//     // });

//     socket.on('connected', name => {
//         // io.emit('connected', name);
//         // console.log('connect')
//         // users[socket.id] = { name }
//         // users[socket.id].words = wordsArray.splice(0, 3);
//         // console.log(wordsArray.length)
//         // console.log(users)
//         // io.emit('grabUsers', users);
//         console.log('connected with react 😉');
//         name.on('subscribeToTimer', (interval) => {
//             console.log('client is subscribing to timer with interval ', interval);
//             setInterval(() => {
//                 name.emit('timer', new Date());
//             }, interval);
//         });
//     });


//     socket.on('disconnect', () => {
//         // io.emit('disconnect', users[socket.id]);
//         // delete users[socket.id]
//         // console.log(users);
//     });
//     // socket.on('typing', () => {
//     //     let hello = 'hello';
//     //     io.emit('typing', hello);
//     // });

// });


http.listen(3000, () => {
    console.log('listening on *:3000');
});