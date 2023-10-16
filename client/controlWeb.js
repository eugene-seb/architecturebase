function ControlWeb() {
    this.mostrarAgregarUsuario = function (nick) {
        let cadena =
            '<tr><th scope="row">1</th><td>' +
            nick +
            '</td><td><button type="button" class="btn btn-danger">Delete</button></td></tr>';

        $("#au").append(cadena);
    };

    this.comprobarSesion = function () {
        let nick = localStorage.getItem("nick");
        if (nick) {
            cw.mostrarMensaje("Bienvenido al sistema, " + nick);
        } else {
            cw.mostrarAgregarUsuario();
        }
    };

    this.salir = function () {
        let nick = localStorage.getItem("nick");
        if (nick) {
            cw.mostrarMensaje("Goodbye " + nick);
            localStorage.removeItem("nick");
            location.reload();
        }
    };
}

$("#btnAU").on("click", function () {
    $("#mAU").remove();

    let nick = $("#nick").val();
    rest.agregarUsuario(nick);

    cw.mostrarAgregarUsuario(nick);
});
