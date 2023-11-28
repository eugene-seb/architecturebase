const modelo = require("./modelo.js");

//dentro del describe general
describe("Pruebas de las partidas", function () {
    let usr2;
    let usr3;

    beforeEach(function () {
        usr2 = { nick: "Pepa", email: "pepa@pepa.es" };
        usr3 = { nick: "Pepo", email: "pepo@pepo.es" };
        sistema.agregarUsuario(usr);
        sistema.agregarUsuario(usr2);
        sistema.agregarUsuario(usr3);
    });

    it("Usuarios y partidas en el sistema", function () {
        expect(sistema.numeroUsuarios()).toEqual(3);
        expect(sistema.obtenerPartidasDisponibles().length).toEqual(0);
    });

    xit("Crear partida", function () {});

    xit("Unir a partida", function () {});

    xit("Un usuario no puede estar dos veces", function () {});

    xit("Obtener partidas", function () {});
});
