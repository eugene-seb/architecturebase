function ControlWeb() {
    this.mostrarAgregarUsuario = function () {
        let cadena = '<div id="mAU" class="form-group">';
        cadena = cadena + '<label for="usr">Name:</label>';

        $("#au").append(cadena);
    };
}

$("#btnAU").on("click", function () {
    $("#mAU").remove();
    let nick = $("#nick").val();
    rest.agregarUsuario(nick);

    cw.mostrarAgregarUsuario();
});
