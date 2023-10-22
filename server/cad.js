const mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

function CAD() {
    this.usuarios = {};

    this.conectar = async function (callback) {
        let cad = this;
        let client = new mongo(
            "mongodb+srv://user:user@cluster0.iwcma45.mongodb.net/?retryWrites=true&w=majority"
        );
        await client.connet();
        const database = client.db("sistema");
        cad.usuarios = database.collection("usuarios");
        callback(database);
    };

    this.buscarOCrearUsuario = function (email, callback) {
        obtenerOCrear(this.usuarios, { email: email }, callback);
    };

    function obtenerOCrear(coleccion, criterio, callback) {
        coleccion.findOneAndUpdate(
            criterio,
            { $set: criterio },
            { upsert: true, returnDocument: "after", projection: { email: 1 } },
            function (err, doc) {
                if (err) {
                    throw err;
                } else {
                    console.log("Elemento actualizado");
                    console.log(doc.value.email);
                    callback({ email: doc.value.email });
                }
            }
        );
    }
}
module.exports.CAD = CAD;