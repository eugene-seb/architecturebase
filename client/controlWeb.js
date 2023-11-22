function ControlWeb() {
    this.mostrarAgregarUsuario = function () {
        //cada vez que se llame a este metodo, si esta dibujado que lo borre(para no tener varios)(si no esta dibujado no borra)
        $("#bnv").remove();
        $("#mAU").remove();
        //guardamos el html en una variable
        //usamos comillas simples para la cadena porque los atributos de las etiquetas usan comillas dobles
        let cadena = '<div id="mAU" class="form-group">';
        cadena = cadena + '<label for="nick">Introduce el nick:</label>';
        cadena = cadena + '<input type="text" class="form-control" id="nick">';
        cadena =
            cadena +
            '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena =
            cadena +
            '<div><a href="/auth/google"><img src="./client/img/btn_google_signin_dark_focus_web.png" style="height:40px;"></a></div>';
        cadena = cadena + "</div>";

        $("#au").append(cadena); //au = agregar usuario

        $("#btnAU").on("click", function () {
            //recoger el valor del input text
            //llamar al servidor usando rest

            let nick = $("#nick").val();
            if (nick) {
                rest.agregarUsuario(nick);
            }
            $("#mAU").remove();
        });
    };

    this.mostrarRegistro = function () {
        if ($.cookie("nick")) {
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
                    console.log(email + " " + pwd);
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
        if ($.cookie("nick")) {
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
                    console.log(email + " " + pwd);
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
        //let nick=localStorage.getItem("nick");
        let nick = $.cookie("nick");
        if (nick) {
            cw.mostrarMsg("Bienvenido al sistema, " + nick);
        } else {
            //cw.mostrarAgregarUsuario();
            cw.mostrarRegistro();
            cw.init();
        }
    };

    this.salir = function () {
        //localStorage.removeItem("nick");
        $.removeCookie("nick");
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
        let cadena = '<h3 id="mMsg">' + msg + "</h3>";
        $("#msg").append(cadena);
    };

    this.mostrarMensajeLogin = function (msg) {
        $("#mMsgLogin").remove();
        let cadena = '<div id="mMsgLogin">' + msg + "</div>";
        $("#msg").append(cadena);
    };

    this.monstrarModal = function (msg) {
        $("#msgModal").remove();
        let cadena = "<div id='msgModal'>" + msg + "</div>";
        $("#bModal").append(cadena);
        $("#myModal").modal();
    };
}
