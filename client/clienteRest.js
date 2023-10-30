function ClienteRest() {
    this.agregarUsuario = function (nick) {
        $.ajax({
            type: "GET",
            url: "/agregarUsuario/" + nick,
            success: function (data) {
                let msg = "El nick " + nick + " está ocupado";
                if (data.nick != -1) {
                    console.log("Usuario " + nick + " ha sido registrado");
                    msg = "Bienvenido al sistema, " + nick;
                    $.cookie("nick", nick);
                } else {
                    console.log("El nick ya está ocupado");
                }
                cw.mostrarMensaje(msg);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };

    this.obtenerUsuarios = function () {
        $.ajax({
            type: "GET",
            url: "/obtenerUsuarios",
            success: function (data) {
                if (data != -1) {
                    console.log("Data " + data);
                } else {
                    console.log("No user is register yet.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };

    this.activeUser = function (nick) {
        $.ajax({
            type: "GET",
            url: "/activeUser/" + nick,
            success: function (data) {
                if (data) {
                    // Should be either true or false
                    console.log("the user " + nick + " is active");
                } else {
                    console.log("the user " + nick + " is not active");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };

    this.deleteUser = function (nick) {
        $.ajax({
            type: "GET",
            url: "/deleteUser/" + nick,
            success: function (data) {
                if (data) {
                    // Should be either true or false
                    console.log("the user " + nick + " has been delete");
                } else {
                    console.log(
                        "the user " + nick + " is not active to be delete"
                    );
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };

    this.countUsers = function () {
        $.ajax({
            type: "GET",
            url: "/countUsers",
            success: function (data) {
                if (data != -1) {
                    console.log("Number of users " + data.num);
                } else {
                    console.log("No user is register yet.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };

    this.enviarJwt = function (jwt) {
        $.ajax({
            type: "POST",
            url: "/enviarJwt",
            data: JSON.stringify({ jwt: jwt }),
            success: function (data) {
                let msg = "El nick " + nick + " está ocupado";
                if (data.nick != -1) {
                    console.log("Usuario " + data.nick + " ha sido registrado");
                    msg = "Bienvenido al sistema, " + data.nick;
                    $.cookie("nick", data.nick);
                } else {
                    console.log("El nick ya está ocupado");
                }
                cw.limpiar();
                cw.mostrarMensaje(msg);
            },
            error: function (xhr, textStatus, errorThrown) {
                //console.log(JSON.parse(xhr.responseText));
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
            //dataType:'json'
        });
    };

    this.registrarUsuario = function (email, password) {
        $.ajax({
            type: "POST",
            url: "/registrarUsuario",
            data: JSON.stringify({ email: email, password: password }),
            success: function (data) {
                if (data.nick != -1) {
                    console.log("Usuario " + data.nick + " ha sido registrado");
                    $.cookie("nick", data.nick);
                    cw.limpiar();
                    cw.mostrarMensaje("Bienvenido al sistema, " + data.nick);
                    //cw.mostrarLogin();
                } else {
                    console.log("El nick está ocupado");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };
}
