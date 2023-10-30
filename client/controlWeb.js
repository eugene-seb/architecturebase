function ControlWeb() {
    this.mostrarAgregarUsuario = function () {
        $("#mAU").remove();
        let cadena = '<div id="mAU">';
        cadena = cadena + '<div class="card"><div class="card-body">';
        cadena = cadena + '<div class="form-group">';
        cadena = cadena + '<label for="nick">Nick:</label>';
        cadena =
            cadena +
            '<p><input type="text" class="form-control" id="nick" placeholder="introduce un nick"></p>';
        cadena =
            cadena +
            '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena =
            cadena +
            '<div><a href="/auth/google"><img src="./client/img/google.png" style="height:40px;"></a></div>';
        cadena = cadena + "</div>";
        cadena = cadena + "</div></div></div>";

        $("#au").append(cadena); //au = agregar usuario

        $("#btnAU").on("click", function () {
            let nick = $("#nick").val();
            if (nick) {
                $("#mAU").remove();
                rest.agregarUsuario(nick);
            }
        });
    };

    this.mostrarRegistro = function () {
        $("#fmRegistro").remove();
        $("#registro").load("./client/registro.html", function () {
            $("#btnRegistro").on("click", function () {
                let email = $("#email").val();
                let pwd = $("#pwd").val();
                if (email && pwd) {
                    rest.registrarUsuario(email, pwd);
                    console.log(email + " " + pwd);
                }
            });
        });
    };

    this.init = function () {
        let cw = this;
        google.accounts.id.initialize({
            client_id:
                "590521076034-qevao0sekmpnfb6if60oobcv74h874pv.apps.googleusercontent.com", //prod
            auto_select: false,
            callback: cw.handleCredentialsResponse,
        });
        google.accounts.id.prompt();
    };

    this.handleCredentialsResponse = function (response) {
        let jwt = response.credential;
        /*let user = JSON.parse(atob(jwt.split(".")[1]));
        console.log(user.name);
        console.log(user.email);
        console.log(user.picture);*/
        rest.enviarJwt(jwt);
    };

    this.comprobarSesion = function () {
        let nick = $.cookie("nick");
        if (nick) {
            cw.mostrarMensaje("Bienvenido al sistema, " + nick);
        } else {
            cw.mostrarRegistro();
            cw.init();
        }
    };

    this.mostrarMensaje = function (msg) {
        $("#mMsg").remove();
        let cadena = '<p id="mMsg">' + msg + "</p>";
        $("#msg").append(cadena);
    };

    this.salir = function () {
        $.removeCookie("nick");
        location.reload();
    };
}
