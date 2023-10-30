const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

function CAD() {
    const uri =
        "mongodb+srv://user:user@cluster0.iwcma45.mongodb.net/?retryWrites=true&w=majority";

    this.usuarios = {};

    this.conectar = async function (callback) {
        let cad = this;
        let client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect();

            const database = client.db("sistema");
            cad.usuarios = database.collection("usuarios");
            //callback(database);
        } finally {
            // Ensures that the client will close when you finish/error
            //await client.close();
        }
    };

    this.buscarOCrearUsuario = function (email, callback) {
        obtenerOCrear(this.usuarios, { email: email }, callback);
    };

    this.buscarUsuario = function (obj, callback) {
        buscar(this.usuarios, { email: obj.email }, callback);
    };

    this.insertarUsuario = function (usuario, callback) {
        insertar(this.usuarios, usuario, callback);
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

    function buscar(coleccion, criterio, callback) {
        let col = coleccion;
        coleccion.find(criterio).toArray(function (error, usuarios) {
            if (usuarios.length == 0) {
                callback(undefined);
            } else {
                callback(usuarios[0]);
            }
        });
    }
    function insertar(coleccion, elemento, callback) {
        coleccion.insertOne(elemento, function (err, result) {
            if (err) {
                console.log("error");
            } else {
                console.log("Nuevo elemento creado");
                callback(elemento);
            }
        });
    }
}
module.exports.CAD = CAD;
