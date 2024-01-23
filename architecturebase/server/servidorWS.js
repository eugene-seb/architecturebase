function WSServer() {
    this.lanzarServidor = function (io, sistema) {
        io.on("connection", function (socket) {
            console.log("Capa WS activa");

            socket.on("newBookCreated", function (data) {
                enviarATodos(socket, "msgBookCreated", data.book.title + " has been added");
            });
        });
    };

    enviarAlRemitente = function (socket, mensaje, datos) {
        socket.emit(mensaje, datos);
    };

    enviarATodos = function (socket, mens, datos) {
        socket.broadcast.emit(mens, datos);
    };

    enviarGlobal = function (io, mens, datos) {
        io.emit(mens, datos);
    };
}
module.exports.WSServer = WSServer;
