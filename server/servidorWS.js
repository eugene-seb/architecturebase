function WSServer() {

    this.lanzarServidor = function (io, sistema) {
        io.on("connection", function (socket) {
            console.log("Capa WS activa");
        });
    };

    this.enviarAlRemitente = function (socket, mensaje, datos) {
        socket.emit(mensaje, datos);
    };

    this.enviarATodos = function (socket, mens, datos) {
        socket.broadcast.emit(mens, datos);
    };
}
module.exports.WSServer = WSServer;
