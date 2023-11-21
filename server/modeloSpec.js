const modelo = require("./modelo.js");

describe("El sistema", function () {
    let sistema;
    beforeEach(function () {
        sistema = new modelo.Sistema(true);
    });

    it("Add user.", function () {
        let nick = "name";
        sistema.agregarUsuario(nick);
        let users = sistema.obtenerUsuarios();
        expect(sistema.countUsers().num).toEqual(1);
        expect(users[nick].nick).toBe(nick);
    });

    it("Delete user", function () {
        let nick = "name";
        sistema.agregarUsuario(nick);
        expect(sistema.deleteUser(nick)).toBe(true);
    });

    it("Get All users", function () {
        sistema.agregarUsuario("nick1");
        sistema.agregarUsuario("nick2");

        const users = sistema.obtenerUsuarios();

        expect(Object.keys(users).length).toBe(2);
        expect(users["nick1"].nick).toBe("nick1");
        expect(users["nick2"].nick).toBe("nick2");
    });

    it("Inicialmente no hay usuarios", function () {
        const num =sistema.countUsers();
        expect(num.num).toEqual(0);
    });

    it("User exists", function () {
		sistema.agregarUsuario("nick1");
        sistema.agregarUsuario("nick2");

        expect(sistema.activeUser("nick")).toBe(false);
    });
});
