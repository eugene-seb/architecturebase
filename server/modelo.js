const correo=require("./email.js");
const datos = require("./cad.js");

function Sistema(test) {
    this.usuarios = {};
    this.test = test;
    this.cad = new datos.CAD();

    if (!this.test) {
        this.cad.conectar(function () {
            //no se define una funcion si no que se llama
            console.log("Conectado a Mongo Atlas");
        });
    }

    this.buscarOCrearUsuario = function (email, callback) {
        this.cad.buscarOCrearUsuario(email, function (obj) {
            callback(obj);
        });
    };

    this.agregarUsuario = function (nick) {
        let res = { nick: -1 };
        if (!this.usuarios[nick]) {
            this.usuarios[nick] = new Usuario(nick);
            res.nick = nick;
            console.log("Nuevo usuario en el sistema:" + nick);
        } else {
            console.log("el nick " + nick + " está en uso");
        }
        return res;
    };

    this.registrarUsuario = function (obj, callback) {
        let modelo = this;
        if (!obj.nick) {
            obj.nick = obj.email;
        }
        this.cad.buscarUsuario(obj, function (usr) {
            if (!usr) {
                //el usuario no existe, luego lo puedo registrar
                obj.key = Date.now().toString();
                obj.confirmada = false;
                modelo.cad.insertarUsuario(obj, function (res) {
                    callback(res);
                });
                correo.enviarEmail(obj.email, obj.key, "Confirmar cuenta");
            } else {
                callback({ email: -1 });
            }
        });
    };

    this.loginUsuario = function (obj, callback) {
        this.cad.buscarUsuario(
            { email: obj.email, confirmada: true },
            function (usr) {
                if (usr && usr.password == obj.password) {
                    callback(usr);
                } else {
                    callback({ email: -1 });
                }
            }
        );
    };

    this.usuarioGoogle=function(usr,callback){
        this.cad.buscarOCrearUsuario(usr,function(res){
            console.log("El usuario "+res.email+" está registrado en el sistema");
            callback(res);
        });
    }

    this.usuarioOAuth = function (usr, callback) {
        this.cad.buscarOCrearUsuario(usr, function (res) {
            console.log(
                "El usuario " + res.email + " está registrado en el sistema"
            );
            callback(res);
        });
    };

    this.obtenerOCrearUsuario = function (email) {
        this.cad.buscarOCrearUsuario(email, function (res) {
            console.log("El usuario " + res.email + " está registrado");
        });
    };

    this.obtenerUsuarios = function () {
        return this.usuarios;
    };

    /**
     * Check if the user exist
     * @param {*} nick
     * @returns
     */
    this.activeUser = function (nick) {
        for (let n in this.usuarios) {
            if (this.usuarios[n].nick == nick) return true;
        }
        return false;
    };

    this.usuarioActivo = function (nick) {
        let res = { res: false };
        if (nick in this.usuarios) {
            res = { res: true };
        }
        return res;
    };

    this.deleteUser = function (nick) {
        if (this.activeUser(nick)) {
            delete this.usuarios[nick];
            return true;
        }
        return false;
    };

    this.eliminarUsuario = function (nick) {
        let res = { "res:": -1 };
        if (nick in this.usuarios) {
            delete this.usuarios[nick];
            console.log("Usuario " + nick + " borrado");
            res = { res: nick };
        } else {
            console.log("No existe el usuario " + nick);
        }
        return res;
    };

    this.confirmarUsuario = function (obj, callback) {
        let modelo = this;
        this.cad.buscarUsuario(
            { email: obj.email, confirmada: false, key: obj.key },
            function (usr) {
                if (usr) {
                    usr.confirmada = true;
                    modelo.cad.actualizarUsuario(usr, function (res) {
                        callback({ email: res.email }); //callback(res)
                    });
                } else {
                    callback({ email: -1 });
                }
            }
        );
    };
    this.countUsers = function () {
        let nbr = Object.keys(this.usuarios).length;
        return { num: nbr };
    };
    this.numeroUsuarios = function () {
        //let numero_usuarios = Object.keys(this.usuarios).length;
        let res = { num: Object.keys(this.usuarios).length };
        return res;
    };
}
module.exports.Sistema = Sistema;

function Usuario(nick) {
    this.nick = nick;
    this.email;
    this.clave;
}

function Usuario(nick, password) {
    this.nick = nick;
    this.password = password;
}