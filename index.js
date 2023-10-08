const fs = require("fs");
const express = require("express");
const app = express();
const modelo = require("./server/modelo.js");
const PORT = process.env.PORT || 3000;

let sistema = new modelo.Sistema();

app.use(express.static(__dirname + "/"));

app.get("/", function (request, response) {
    var contenido = fs.readFileSync(__dirname + "/client/index.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});

app.listen(PORT, () => {
    console.log(`App está escuchando en el puerto ${PORT}`);
    console.log("Ctrl+C para salir");
});

app.get("/agregarUsuario/:nick", function (request, response) {
    let nick = request.params.nick;
    let res = sistema.agregarUsuario(nick);
    response.send(res);
});

app.get("/obtenerUsuarios/", function (request, response) {
    let res = sistema.obtenerUsuarios();
    response.send(res);
});

app.get("/activeUser/:nick", function (request, response) {
    let nick = request.params.nick;
    let res = sistema.activeUser(nick);
    response.send(res);
});

app.get("/deleteUser/:nick", function (request, response) {
    let nick = request.params.nick;
    let res = sistema.deleteUser(nick);
    response.send(res);
});

app.get("/countUsers/", function (request, response) {
    let res = sistema.countUsers();
    response.send(res);
});