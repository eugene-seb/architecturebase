const bcrypt = require("bcrypt");
const correo = require("./email.js");
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

    this.agregarUsuario = function (email) {
        let res = { email: -1 };
        if (!this.usuarios[email]) {
            this.usuarios[email] = new Usuario(email);
            res.email = email;
            console.log("Nuevo usuario en el sistema:" + email);
        } else {
            console.log("el email " + email + " está en uso");
        }
        return res;
    };

    this.registrarUsuario = function (obj, callback) {
        let modelo = this;
        if (!obj.email) {
            obj.email = obj.email;
        }
        this.cad.buscarUsuario(obj, function (usr) {
            if (!usr) {
                //el usuario no existe, luego lo puedo registrar
                obj.key = Date.now().toString();
                obj.confirmada = false;
                bcrypt.hash(obj.password, 10, function (err, hash) {
                    obj.password = hash;
                    modelo.cad.insertarUsuario(obj, function (res) {
                        callback(res);
                    });
                    if(!modelo.test)
                        correo.enviarEmail(obj.email, obj.key, "Confirmar cuenta");
                });
            } else {
                callback({ email: -1 });
            }
        });
    };

    this.loginUsuario = function (obj, callback) {
        this.cad.buscarUsuario(
            { email: obj.email, confirmada: true },
            function (usr) {
                if (usr) {
                    bcrypt.compare(
                        obj.password, // plaintext password
                        usr.password, // hashed password
                        function (err, result) {
                            if (result) {
                                callback(usr);
                            } else {
                                callback({ email: -1 });
                            }
                        }
                    );
                } else {
                    callback({ email: -1 });
                }
            }
        );
    };

    this.usuarioGoogle = function (usr, callback) {
        this.cad.buscarOCrearUsuario(usr, function (res) {
            console.log(
                "El usuario " + res.email + " está registrado en el sistema"
            );
            callback(res);
        });
    };

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
     * @param {*} email
     * @returns
     */
    this.activeUser = function (email) {
        for (let n in this.usuarios) {
            if (this.usuarios[n].email == email) return true;
        }
        return false;
    };

    this.usuarioActivo = function (email) {
        let res = { res: false };
        if (email in this.usuarios) {
            res = { res: true };
        }
        return res;
    };

    this.deleteUser = function (email) {
        if (this.activeUser(email)) {
            delete this.usuarios[email];
            return true;
        }
        return false;
    };

    this.eliminarUsuario = function (email) {
        let res = { "res:": -1 };
        if (email in this.usuarios) {
            delete this.usuarios[email];
            console.log("Usuario " + email + " borrado");
            res = { res: email };
        } else {
            console.log("No existe el usuario " + email);
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

function Usuario(email) {
    this.email = email;
    this.nombre;
    this.clave;
    this.password;
}

function Usuario(email, password) {
    this.email = email;
    this.password = password;
    this.nombre;
    this.clave;
}
