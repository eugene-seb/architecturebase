function ClienteWS() {
    this.socket = undefined;
    this.email;

    this.ini = function () {
        this.socket = io.connect();
        this.lanzarServidorWS();
    };

    this.lanzarServidorWS = function () {
        this.socket.on("connect", function () {
            console.log("Usuario conectado al servidor de WebSockets");
        });

        this.socket.on("msgBookCreated", function (msg) {
            cw.mostrarMsg(msg);
        });
    };

    this.newBookCreated = function (data) {
        this.socket.emit("newBookCreated", { book: data });
    };
}
