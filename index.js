const fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const passport = require("passport");
const cookieSession = require("cookie-session");
const LocalStrategy = require("passport-local").Strategy;
const args = process.argv.slice(2);
require("./server/passport-setup.js");
const modelo = require("./server/modelo.js");
const PORT = process.env.PORT || 3000;

let test = false;
test = eval(args[0]); //test=true

app.use(
    express.static(__dirname + "/"),
    cookieSession({
        name: "Batalla Naval",
        keys: ["key1", "key2"],
    }),
    passport.initialize(),
    passport.session(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
);
passport.use(
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        function (email, password, done) {
            sistema.loginUsuario(
                { email: email, password: password },
                function (user) {
                    if (user.email != -1) {
                        return done(null, user);
                    } else {
                        return done(-1);
                    }
                }
            );
        }
    )
);

let sistema = new modelo.Sistema(test);

app.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/fallo" }),
    function (req, res) {
        res.redirect("/good");
    }
);

app.get("/good", function (request, response) {
    let email = request.user.emails[0].value;
    //if (nick){  //no tiene mucho sentido este if porque si viene de google es que existe
    sistema.usuarioOAuth({ email: email }, function (usr) {
        response.cookie("nick", usr.email);
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
app.get("/ok", function (request, response) {
    response.send({ nick: request.user.email });
});

app.get("/", function (request, response) {
    var contenido = fs.readFileSync(__dirname + "/client/index.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/fallo" }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect("/goodFb");
    }
);

app.get("/goodFb", function (request, response) {
    let nick = request.user.displayName;
    //if (nick){  //no tiene mucho sentido este if porque si viene de google es que existe
    sistema.usuarioOAuth({ nick: nick }, function (usr) {
        response.cookie("nick", nick);
        response.redirect("/");
    });
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

app.get("/usuarioActivo/:nick", function (request, response) {
    let nick = request.params.nick;
    let res = sistema.usuarioActivo(nick);
    response.send(res);
});
app.get("/numeroUsuarios", function (request, response) {
    let res = sistema.numeroUsuarios();
    response.send(res);
});

app.get("/deleteUser/:nick", function (request, response) {
    let nick = request.params.nick;
    let res = sistema.deleteUser(nick);
    response.send(res);
});
app.get("/eliminarUsuario/:nick", function (request, response) {
    let nick = request.params.nick;
    let res = sistema.eliminarUsuario(nick);
    response.send(res);
});

app.get("/countUsers/", function (request, response) {
    let res = sistema.countUsers();
    response.send(res);
});

app.post("/enviarJwt", function (request, response) {
    let jwt = request.body.jwt;
    let user = JSON.parse(atob(jwt.split(".")[1]));
    let email = user.email;
    sistema.usuarioOAuth({ email: email }, function (obj) {
        response.send({ nick: obj.email });
    });
});
app.get("/confirmarUsuario/:email/:key", function (request, response) {
    let email = request.params.email;
    let key = request.params.key;
    sistema.confirmarUsuario({ email: email, key: key }, function (usr) {
        if (usr.email != -1) {
            response.cookie("nick", usr.email);
        }
        response.redirect("/");
    });
});

app.post("/registrarUsuario", function (request, response) {
    sistema.registrarUsuario(request.body, function (res) {
        response.send({ nick: res.email });
    });
});

app.post(
    "/loginUsuario",
    passport.authenticate("local", {
        failureRedirect: "/fallo",
        successRedirect: "/ok",
    })
);
