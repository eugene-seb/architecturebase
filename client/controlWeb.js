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

    this.comprobarSesion = function () {
        let nick = $.cookie("nick");
        if (nick) {
            cw.mostrarMensaje("Bienvenido al sistema, " + nick);
        } else {
            cw.mostrarAgregarUsuario();
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