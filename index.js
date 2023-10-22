const fs = require("fs");
const express = require("express");
const app = express();
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./server/passport-setup.js");
const modelo = require("./server/modelo.js");
const PORT = process.env.PORT || 3000;

let sistema = new modelo.Sistema();

app.use(
    express.static(__dirname + "/"),
    cookieSession({
        name: "Batalla Naval",
        keys: ["key1", "key2"],
    }),
    passport.initialize(),
    passport.session()
);

app.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/fallo" }),
    function (req, res) {
        res.redirect("/good");
    }
);

app.get("/good", function (request, response) {
    let email = request.user.emails[0].value;
    sistema.buscarOCrearUsuario(email, function (obj) {
        response.cookie("nick", obj.email);
        response.redirect("/");
    });
});

app.get("/fallo", function (request, response) {
    response.send({ nick: "nook" });
});

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

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
