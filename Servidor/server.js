var express = require("express");
var app = express();
var temp = [{tarea: 'Prueba1', prioridad: 'High', fecha: '5/2/2019 21:43:35', completada: true, usuario: 'Fran'},
    {tarea: 'Prueba2', prioridad: 'Medium', fecha: '5/2/2019 21:44:35', completada: false, usuario: 'Fran'},
    {tarea: 'Prueba3', prioridad: 'Low', fecha: '5/2/2019 21:45:35', completada: true, usuario: 'Fran'}];
var cont = 0;
var usuariosConectados = [];

// Settings for CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.static(__dirname + "/public"));
var server = app.listen(3000);
var io = require("socket.io").listen(server);

io.on("connection", function (socket) {
    console.log("CONECTADO DE UNA VEZ!");
    socket.emit("sentList", JSON.stringify(temp));

    socket.on('addNewTodo', function (lista) {
        console.log(JSON.parse(lista));
        temp = JSON.parse(lista);
        socket.broadcast.emit('sentList', JSON.stringify(temp));
    });

    socket.on('registrarUsuario', function (algo) {
        socket.nick = algo;
        console.log(algo);
        usuariosConectados.push({
            id: 'user' + (++cont),
            name: algo,
            imageUrl: ''
        });
        io.emit('updateUsuarios', JSON.stringify(usuariosConectados));
    });

    socket.on('disconnect', function () {
        socket.broadcast.emit('usuarioDesconectado', socket.nick);
    })
});


