var express = require('express');
var app = express();    
var server = require('http').Server(app);
var io = require('socket.io')(server);  

app.use(express.static('client'));

app.get('/hola-mundo', function(req, res) {
    res.status(200).send('Hola mundo desde una ruta');
       
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y NodeJS de Alex',
    nickname: 'Bot - rehtse'
}];

io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    // Emitir mensajes iniciales al cliente
    socket.emit('messages', messages);
    socket.on('add-message', (data) => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});


server.listen(6677, function() {
    console.log('Servidor corriendo en http://localhost:6677');
});