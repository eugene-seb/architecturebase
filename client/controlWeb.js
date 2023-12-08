function ControlWeb() {
    this.mostrarRegistro = function () {
        if ($.cookie("email")) {
            return true;
        }
        $("#fmRegistro").remove();
        $("#registro").load("./client/registro.html", function () {
            $("#btnRegistro").on("click", function (e) {
                e.preventDefault();
                let email = $("#email").val();
                let pwd = $("#pwd").val();
                if (IsEmail(email) && pwd) {
                    rest.registrarUsuario(email, pwd);
                } else {
                    let msg = "Bad credentials";
                    $("#msgModal").remove();
                    let cadena = "<div id='msgModal'>" + msg + "</div>";
                    $("#bModal").append(cadena);
                    $("#myModal").modal();
                }
            });
        });
    };

    this.mostrarLogin = function () {
        if ($.cookie("email")) {
            return true;
        }
        $("#fmLogin").remove();
        $("#registro").load("./client/login.html", function () {
            $("#btnLogin").on("click", function (e) {
                e.preventDefault();
                let email = $("#email").val();
                let pwd = $("#pwd").val();
                if (IsEmail(email) && pwd) {
                    rest.loginUsuario(email, pwd);
                } else {
                    let msg = "Bad credentials";
                    $("#msgModal").remove();
                    let cadena = "<div id='msgModal'>" + msg + "</div>";
                    $("#bModal").append(cadena);
                    $("#myModal").modal();
                }
            });
        });
    };

    function IsEmail(email) {
        var regex =
            /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            return false;
        } else {
            return true;
        }
    }

    this.init = function () {
        let cw = this;
        google.accounts.id.initialize({
            client_id:
                "590521076034-qevao0sekmpnfb6if60oobcv74h874pv.apps.googleusercontent.com", //prod
            auto_select: false,
            callback: cw.handleCredentialsResponse,
        });
        google.accounts.id.prompt();
    };

    this.handleCredentialsResponse = function (response) {
        let jwt = response.credential;
        /*let user = JSON.parse(atob(jwt.split(".")[1]));
        console.log(user.name);
        console.log(user.email);
        console.log(user.picture);*/
        rest.enviarJwt(jwt);
    };

    this.comprobarSesion = function () {
        //let email=localStorage.getItem("email");
        let email = $.cookie("email");
        if (email) {
            cw.mostrarCatalog();
            cw.mostrarLoan();
        } else {
            cw.mostrarLogin();
            cw.init();
        }
    };

    this.salir = function () {
        //localStorage.removeItem("email");
        $.removeCookie("email");
        location.reload();
        rest.cerrarSesion();
    };

    this.limpiar = function () {
        $("#mAU").remove();
        $("#fmRegistro").remove();
        $("#fmLogin").remove();
    };

    this.mostrarMsg = function (msg) {
        $("#mMsg").remove();
        let message = '<p id="mMsg">' + msg + "</p>";
        $("#bModalMessage").append(message);
        $("#modalMessage").modal();
    };

    this.mostrarMensajeLogin = function (msg) {
        $("#mMsgLogin").remove();
        let cadena = '<div id="mMsgLogin">' + msg + "</div>";
        $("#msg").append(cadena);
    };

    this.monstrarModalLogin = function (msg) {
        $("#msgModal").remove();
        let cadena = "<div id='msgModal'>" + msg + "</div>";
        $("#bModal").append(cadena);
        $("#myModal").modal();
    };

    //------------------Book management--------------------------------------------------------

    this.mostrarCatalog = function () {
        $("#tbCatalog").remove();
        $("#catalog").load("./client/catalog.html", function () {
            
            cw.getAllBooks();

            $("#btnCreateBook").on("click", function () {
                cw.monstrarModalNewBook();
            });

            $("#btnNewBook").on("click", function (e) {
                e.preventDefault();

                let isbn = $("#isbn").val();
                let title = $("#title").val();
                let author = $("#author").val();
                let type = $("#type").val();

                if (isbn && title && author && type) {
                    rest.createNewBook(isbn, title, author, type);
                } else {
                    cw.getAllBooks();
                    let msg = "Please fill the form correctly.";
                    cw.mostrarMsg(msg);
                }
                $("#modalNewBook").modal("hide");
            });
        });
    };

    this.getAllBooks = function () {
        rest.getAllBooks();
    };

    this.monstrarModalNewBook = function () {
        $("#modalNewBook").modal();
    };

    //------------------Book management--------------------------------------------------------

    //------------------Loan management--------------------------------------------------------

    this.monstrarModalNewLoan = function (book) {
        
        $('#' + book.isbn).on("click", function () {
            $("#modalNewLoan").modal();
        });

        // Create new loan
        $("#btnNewLoan").on("click", function (e) {
            e.preventDefault();

            let returnDate = $("#returnDate").val();

            if (returnDate) {
                let userId = $.cookie("email");
                rest.createNewLoan(userId, book, returnDate);
            } else {
                cw.getAllLoans();
                let msg = "Please choose a good date.";
                cw.mostrarMsg(msg);
            }
            $("#modalNewLoan").modal("hide");
        });
    };

    this.mostrarLoan = function () {
        $("#tbLoan").remove();
        $("#loan").load("./client/loan.html", function () {
            
            cw.getAllLoans();

        });
    }

    this.getAllLoans = function () {
        rest.getAllLoans();
    };
    //------------------Loan management--------------------------------------------------------
}
