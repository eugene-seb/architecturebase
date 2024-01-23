function WSServer() {
    this.lanzarServidor = function (io, sistema) {
        io.on("connection", function (socket) {
            console.log("Capa WS activa");

            socket.on("loginUsuario", function (email) {
                enviarAlRemitente(
                    socket,
                    "msgUserLoggedIn",
                    email + " has logged in."
                );
            });

            socket.on("logOut", function (email) {
                enviarAlRemitente(
                    socket,
                    "msgUserLoggedOut",
                    email + " has logged out."
                );
            });

            socket.on("newBookCreated", function (data) {
                enviarATodos(
                    socket,
                    "msgBookCreated",
                    data.book.title + " has been added"
                );
            });

            socket.on("newCopyAdded", function (isbn) {
                enviarGlobal(
                    io,
                    "msgBookCreated",
                    "A copy of " + isbn + " has been added"
                );
            });

            socket.on("copyRemoved", function (data) {
                enviarGlobal(
                    io,
                    "msgcopyRemoved",
                    "A copy of " + data.isbn + " has been removed"
                );
            });

            socket.on("newLoanCreated", function (data) {
                enviarGlobal(
                    io,
                    "msgBookCreated",
                    data.loan.title + " has been loaned"
                );
            });

            socket.on("returnBook", function (data) {
                enviarGlobal(
                    io,
                    "msgReturnBook",
                    "A copy of " + data.isbn + " has been returned"
                );
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
