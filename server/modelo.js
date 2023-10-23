const datos = require("./cad.js");

function Sistema(test) {
    this.usuarios = {};
    this.test = test;
    this.cad = new datos.CAD();

    if (!this.test) {
        this.cad.conectar = function () {
            console.log("Connect at Mongo Atlas");
        };
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
        } else {
            console.log("el nick " + nick + " está en uso");
        }
        return res;
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

    this.deleteUser = function (nick) {
        if (this.activeUser(nick)) {
            delete this.usuarios[nick];
            return true;
        }
        return false;
    };

    this.countUsers = function () {
        let nbr = Object.keys(this.usuarios).length;
        return { num: nbr };
    };
}
module.exports.Sistema = Sistema;

function Usuario(nick) {
    this.nick = nick;
    this.email;
    this.clave;
}
