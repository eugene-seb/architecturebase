function WSServer() {
    this.lanzarServidor = function (io, sistema) {
        io.on("connection", function (socket) {
            console.log("Capa WS activa");
        });

        io.on("crearPartida", function (datos) {
            let codigo = sistema.crearPartida(datos.email);
            if (codigo != -1) {
                socket.join(codigo);
            }
        });
    };

    this.enviarAlRemitente = function (socket, mensaje, datos) {
        socket.emit(mensaje, datos);
    };

    this.enviarATodos = function (socket, mens, datos) {
        socket.broadcast.emit(mens, datos);
    };

    this.enviarGlobal = function (io, mens, datos) {
        io.emit(mens, datos);
    };
}
module.exports.WSServer = WSServer;
