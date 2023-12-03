function ClienteWS() {
    
    this.socket = undefined;
    this.email;
    this.codigo;

    this.ini = function () {
        this.socket = io.connect();
        this.lanzarServidorWS();
    };

    this.crearPartida = function() {
        this.socket.emit("crearPartida", {"email": this.email});
    }

    this.lanzarServidorWS = function () {
        this.socket.on("connect", function () {
            console.log("Usuario conectado al servidor de WebSockets");
        });
    };
}
