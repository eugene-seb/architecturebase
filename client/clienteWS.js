function ClienteWS() {
    
    this.socket = undefined;

    this.ini = function () {
        this.socket = io.connect();
    };
    this.ini();

    this.lanzarServidorWS = function () {
        this.socket.on("connect", function () {
            console.log("Usuario conectado al servidor de WebSockets");
        });
    };
}
