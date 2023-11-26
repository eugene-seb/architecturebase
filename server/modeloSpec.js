const modelo = require("./modelo.js");

describe("El sistema", function () {
    let sistema;
    beforeEach(function () {
        sistema = new modelo.Sistema(true);
    });

    it("Add user.", function () {
        let email = "name";
        sistema.agregarUsuario(email);
        let users = sistema.obtenerUsuarios();
        expect(sistema.countUsers().num).toEqual(1);
        expect(users[email].email).toBe(email);
    });

    it("Delete user", function () {
        let email = "name";
        sistema.agregarUsuario(email);
        expect(sistema.deleteUser(email)).toBe(true);
    });

    it("Get All users", function () {
        sistema.agregarUsuario("email1");
        sistema.agregarUsuario("email2");

        const users = sistema.obtenerUsuarios();

        expect(Object.keys(users).length).toBe(2);
        expect(users["email1"].email).toBe("email1");
        expect(users["email2"].email).toBe("email2");
    });

    it("Inicialmente no hay usuarios", function () {
        const num =sistema.countUsers();
        expect(num.num).toEqual(0);
    });

    it("User exists", function () {
		sistema.agregarUsuario("email1");
        sistema.agregarUsuario("email2");

        expect(sistema.activeUser("email")).toBe(false);
    });
});
