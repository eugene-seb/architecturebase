var mongo = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;

function CAD() {
    this.usuarios = {};

    this.conectar = async function (callback) {
        let cad = this;
        let client = new mongo(
            "mongodb+srv://user:user@cluster0.iwcma45.mongodb.net/?retryWrites=true&w=majority"
        );
        await client.connect();
        const database = client.db("sistema");
        cad.usuarios = database.collection("usuarios");
        callback(database);
    };

    this.buscarOCrearUsuario = function (usr, callback) {
        //buscarOCrear(this.usuarios,{email:email},callback);
        buscarOCrear(this.usuarios, usr, callback);
    };

    this.buscarUsuario = function (criterio, callback) {
        buscar(this.usuarios, criterio, callback);
    };

    this.insertarUsuario = function (usuario, callback) {
        insertar(this.usuarios, usuario, callback);
    };

    this.actualizarUsuario = function (obj, callback) {
        actualizar(this.usuarios, obj, callback);
    };

    function buscarOCrear(coleccion, criterio, callback) {
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

    function actualizar(coleccion, obj, callback) {
        coleccion.findOneAndUpdate(
            { _id: ObjectId(obj._id) },
            { $set: obj },
            {
                upsert: false,
                returnDocument: "after",
                projection: { email: 1 },
            },
            function (err, doc) {
                if (err) {
                    throw err;
                } else {
                    console.log("Elemento actualizado");
                    //console.log(doc);
                    //console.log(doc);
                    callback({ email: doc.value.email });
                }
            }
        );
    }
}
module.exports.CAD = CAD;
