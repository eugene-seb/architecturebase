function ClienteWS() {
    this.socket = undefined;
    this.email;

    this.ini = function () {
        this.socket = io.connect("http://localhost:3001");
        this.lanzarServidorWS();
    };

    this.lanzarServidorWS = function () {
        this.socket.on("connect", function () {
            console.log("Usuario conectado al servidor de WebSockets");
        });

        this.socket.on("msgUserLoggedIn", function (msg) {
            // Nothing to do for now
        });

        this.socket.on("msgUserLoggedOut", function (msg) {
            // Nothing to do for now
        });

        this.socket.on("msgBookCreated", function (msg) {
            cw.mostrarCatalog();
            cw.mostrarLoanOfUser($.cookie("email"));
        });

        this.socket.on("msgCopyAdded", function (msg) {
            cw.mostrarCatalog();
        });

        this.socket.on("msgcopyRemoved", function (msg) {
            cw.mostrarCatalog();
        });

        this.socket.on("msgLoanCreated", function (msg) {
            cw.mostrarCatalog();
            cw.mostrarMsg(msg);
        });

        this.socket.on("msgReturnBook", function (msg) {
            cw.mostrarCatalog();
            cw.mostrarLoanOfUser($.cookie("email"));
        });
    };

    this.loginUsuario = function (email) {
        this.socket.emit("loginUsuario", { email: email });
    };

    this.logOut = function (email) {
        this.socket.emit("logOut", { email: email });
    };

    this.newBookCreated = function (data) {
        this.socket.emit("newBookCreated", { book: data });
    };

    this.newCopyAdded = function (isbn) {
        this.socket.emit("newCopyAdded", { isbn: isbn });
    };

    this.copyRemoved = function (isbn) {
        this.socket.emit("copyRemoved", { isbn: isbn });
    };

    this.newLoanCreated = function (data) {
        this.socket.emit("newLoanCreated", { loan: data });
    };

    this.returnBook = function (isbn) {
        this.socket.emit("returnBook", { isbn: isbn });
    };
}
