const fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const httpServer = require("http").Server(app);
const { Server } = require("socket.io");
const moduloWS = require("./server/servidorWS.js");
const jwt = require("jsonwebtoken");
//const passport = require("passport");
const cookieSession = require("cookie-session");
//const LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");
const args = process.argv.slice(2);
//require("./server/passport-setup.js");
const modelo = require("./server/modelo.js");
const PORT = process.env.PORT || 3001;

let test = false;
test = eval(args[0]); //test=true
let sistema = new modelo.Sistema(test);

let ws = new moduloWS.WSServer();
let io = new Server(httpServer,{cors:{ origins: '*:*'}});


httpServer.listen(PORT, () => {
    console.log(`App está escuchando en el puerto ${PORT}`);
    console.log("Ctrl+C para salir");
});
//io.listen(httpServer);
ws.lanzarServidor(io, sistema);

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

app.use(
    express.static(__dirname + "/"),
    cookieSession({
        name: "Batalla Naval",
        keys: ["key1", "key2"],
    }),
    //passport.initialize(),
    //passport.session(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
);

/*passport.use(
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        function (email, password, done) {
            sistema.loginUsuario(
                { email: email, password: password },
                function (user) {
                    return done(null, user);
                }
            );
        }
    )
);*/

const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json({ error: "Acceso denegado" });
    try {
        const verified = jwt.verify(token, "tu-clave-secreta");
        req.user = verified;
        next(); // continuamos
    } catch (error) {
        res.status(400).json({ error: "token no es válido" });
    }
};

/*const haIniciado = function (request, response, next) {
    if (request.user) {
        next();
    } else {
        response.redirect("/");
    }
};*/

/*app.get("/good", function (request, response) {
    let email = request.user.emails[0].value;
    //if (email){  //no tiene mucho sentido este if porque si viene de google es que existe
    sistema.usuarioOAuth({ email: email }, function (usr) {
        response.cookie("email", usr.email);
        response.redirect("/");
    });
});*/

/*app.get("/fallo", function (request, response) {
    response.send({ email: "nook" });
});*/

/*app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);*/
/*app.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/fallo" }),
    function (req, res) {
        res.redirect("/good");
    }
);*/
/*app.post(
    "/oneTap/callback",
    passport.authenticate("google-one-tap", { failureRedirect: "/fallo" }),
    function (req, res) {
        res.redirect("/good");
    }
);*/

/*app.get("/ok", function (request, response) {
    response.send({ email: request.user.email });
});*/

/*
app.get("/", function (request, response) {
    var contenido = fs.readFileSync(__dirname + "/client/index.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});
*/

app.get("/agregarUsuario/:email", function (request, response) {
    let email = request.params.email;
    let res = sistema.agregarUsuario(email);
    response.send(res);
});

app.get("/obtenerUsuarios/", verifyToken, function (request, response) {
    let res = sistema.obtenerUsuarios();
    response.send(res);
});

app.get("/activeUser/:email", verifyToken, function (request, response) {
    let email = request.params.email;
    let res = sistema.activeUser(email);
    response.send(res);
});

app.get("/usuarioActivo/:email", verifyToken, function (request, response) {
    let email = request.params.email;
    let res = sistema.usuarioActivo(email);
    response.send(res);
});
app.get("/numeroUsuarios", verifyToken, function (request, response) {
    let res = sistema.numeroUsuarios();
    response.send(res);
});

app.get("/deleteUser/:email", verifyToken, function (request, response) {
    let email = request.params.email;
    let res = sistema.deleteUser(email);
    response.send(res);
});
app.get("/eliminarUsuario/:email", verifyToken, function (request, response) {
    let email = request.params.email;
    let res = sistema.eliminarUsuario(email);
    response.send(res);
});

app.get("/countUsers/", verifyToken, function (request, response) {
    let res = sistema.countUsers();
    response.send(res);
});

/*app.post("/enviarJwt", function (request, response) {
    let jwt = request.body.jwt;
    let user = JSON.parse(atob(jwt.split(".")[1]));
    let email = user.email;
    sistema.usuarioOAuth({ email: email }, function (obj) {
        response.send({ email: obj.email });
    });
});*/

app.post("/enviarJwt", function (request, response) {
    let jswt = request.body.jwt;
    let user = JSON.parse(atob(jswt.split(".")[1]));
    let email = user.email;
    sistema.usuarioGoogle({ email: email }, function (obj) {
        let token = jwt.sign(
            { email: obj.email, id: obj._id },
            "tu-clave-secreta"
        );
        response
            .header("auth-token", token)
            .json({ error: null, data: token, email: obj.email });
    });
});

app.get("/confirmarUsuario/:email/:key", function (request, response) {
    let email = request.params.email;
    let key = request.params.key;
    sistema.confirmarUsuario({ email: email, key: key }, function (usr) {
        if (usr.email != -1) {
            response.cookie("email", usr.email);
        }
        response.redirect("http://localhost:3000");
    });
});

app.post("/registrarUsuario", function (request, response) {
    sistema.registrarUsuario(request.body, function (res) {
        response.send({ email: res.email });
    });
});

app.post("/loginUsuario", function (request, response) {
    sistema.loginUsuario(request.body, function (user) {
        let token = jwt.sign(
            { email: user.email, id: user._id },
            "tu-clave-secreta"
        );
        response
            .header("auth-token", token)
            .json({ error: null, data: token, email: user.email });
    });
});

/* app.post(
    "/loginUsuario",
    passport.authenticate("local", {
        failureRedirect: "/fallo",
        successRedirect: "/ok",
    })
);*/

app.get("/cerrarSesion", verifyToken, function (request, response) {
    let email = request.user.email;
    request.logout();
    response.redirect("/");
    if (email) {
        sistema.eliminarUsuario(email);
    }
});

//------------------Book management--------------------------------------------------------

app.post(
    "/createNewBook",
    /*haIniciado,*/ function (request, response) {
        sistema.createNewBook(request.body, function (res) {
            response.send({
                isbn: res.isbn,
                title: res.title,
                author: res.author,
                type: res.type,
                nbrClone: res.nbrClone,
            });
        });
    }
);

app.get(
    "/getAllBooks",
    /*haIniciado,*/ function (request, response) {
        sistema.getAllBooks(function (res) {
            response.send({ allBooks: res });
        });
    }
);

app.post(
    "/addCopyBook",
    /*haIniciado,*/ function (request, response) {
        sistema.addCopyBook(request.body, function (res) {
            response.send({
                isbn: res.isbn,
                nbrCopies: res.nbrCopies,
            });
        });
    }
);

app.post(
    "/removeCopyBook",
    /*haIniciado,*/ function (request, response) {
        sistema.removeCopyBook(request.body, function (res) {
            response.send({
                isbn: res.isbn,
                nbrCopies: res.nbrCopies,
            });
        });
    }
);

//------------------Book management--------------------------------------------------------

//------------------Loan management--------------------------------------------------------

app.post(
    "/createNewLoan",
    /*haIniciado,*/ function (request, response) {
        sistema.createNewLoan(request.body, function (res) {
            response.send({
                loanId: res.loanId,
                userId: res.userId,
                isbn: res.isbn,
                title: res.title,
                loanDate: res.loanDate,
                returnDate: res.returnDate,
            });
        });
    }
);

app.get(
    "/getAllLoans",
    /*haIniciado,*/ function (request, response) {
        sistema.getAllLoans(function (res) {
            response.send({ allLoans: res });
        });
    }
);

app.post(
    "/getLoansByUser",
    /*haIniciado,*/ function (request, response) {
        sistema.getLoansByUser(request.body, function (res) {
            response.send({ allLoans: res });
        });
    }
);

app.post(
    "/returnBook",
    /*haIniciado,*/ function (request, response) {
        sistema.returnBook(request.body, function (res) {
            response.send({ result: res });
        });
    }
);

//------------------Loan management--------------------------------------------------------
