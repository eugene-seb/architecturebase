function Sistema() {
    this.usuarios = {};

    this.agregarUsuario = function (nick) {
        this.usuarios[nick] = new Usuario(nick);
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
        return Object.keys(this.usuarios).length;
    }
}

function Usuario(nick) {
    this.nick = nick;
}
