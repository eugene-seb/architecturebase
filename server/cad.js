var mongo = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;

function CAD() {
    this.usuarios = {};
    this.books = {};
    this.loans = {};

    this.conectar = async function (callback) {
        let cad = this;
        let client = new mongo(
            "mongodb+srv://user:user@cluster0.iwcma45.mongodb.net/?retryWrites=true&w=majority"
        );
        await client.connect();
        const database = client.db("sistema");
        cad.usuarios = database.collection("usuarios");
        cad.books = database.collection("books");
        cad.loans = database.collection("loans");
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

    this.eliminarUsuario = function (criterio, callback) {
        eliminar(this.usuarios, criterio, callback);
    };

    function eliminar(coleccion, criterio, callback) {
        coleccion.deleteOne(criterio, function (err, result) {
            if (err) throw err;
            callback(result);
        });
    }

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

    //------------------Book management--------------------------------------------------------

    this.buscarBook = function (criterio, callback) {
        buscarBooks(this.books, criterio, callback);
    };
    this.insertarBook = function (book, callback) {
        insertarNewBook(this.books, book, callback);
    };

    function buscarBooks(coleccion, criterio, callback) {
        coleccion.find(criterio).toArray(function (error, books) {
            if (books.length == 0) {
                callback(undefined);
            } else {
                callback(books[0]);
            }
        });
    }

    function insertarNewBook(coleccion, elemento, callback) {
        coleccion.insertOne(elemento, function (err, result) {
            if (err) {
                console.log("An error occur while creating the book.");
            } else {
                console.log("New book added");
                callback(elemento);
            }
        });
    }

    /**
     * Return a list of objects Book
     *
     * @returns
     */
    this.getAllBooks = async function () {
        // Find all documents in the collection
        const cursor = this.books.find();

        // Convert the cursor to an array of documents
        const documents = await cursor.toArray();

        return documents;
    };
    //------------------Book management--------------------------------------------------------

    //------------------Loan management--------------------------------------------------------

    this.buscarLoan = function (criterio, callback) {
        buscarLoans(this.loans, criterio, callback);
    };
    this.insertarLoan = function (loan, callback) {
        insertarNewLoan(this.loans, loan, callback);
    };

    function buscarLoans(coleccion, criterio, callback) {
        coleccion.find(criterio).toArray(function (error, loans) {
            if (loans.length == 0) {
                callback(undefined);
            } else {
                callback(loans[0]);
            }
        });
    }

    function insertarNewLoan(coleccion, elemento, callback) {
        coleccion.insertOne(elemento, function (err, result) {
            if (err) {
                console.log("An error occur while creating the loan.");
            } else {
                console.log("New loan added");
                callback(elemento);
            }
        });
    }

    /**
     * Return a list of objects Loan
     *
     * @returns
     */
    this.getAllLoans = async function () {
        // Find all documents in the collection
        const cursor = this.loans.find();

        // Convert the cursor to an array of documents
        const documents = await cursor.toArray();

        return documents;
    };

    /**
     *
     * @param {*} userId
     * @returns
     */
    this.getLoansByUser = async function (userId) {
        // Find documents in the collection where userId matches
        const cursor = this.loans.find({ userId: userId });

        // Convert the cursor to an array of documents
        const documents = await cursor.toArray();

        return documents;
    };

    //------------------Loan management--------------------------------------------------------
}
module.exports.CAD = CAD;
