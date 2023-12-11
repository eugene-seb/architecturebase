function ClienteRest() {
    this.agregarUsuario = function (email) {
        var cli = this;
        $.getJSON("/agregarUsuario/" + email, function (data) {
            let msg = "";
            if (data.email != -1) {
                console.log("Usuario " + email + " ha sido registrado");
                msg = "Usuario " + email + " ha sido registrado";
                //localStorage.setItem("email",email);
                $.cookie("email", email);
            } else {
                console.log("El email ya está ocupado");
                msg = "El email " + email + " ya está ocupado";
            }
            //cw se puede usar porque esta creada en el index(por lo que es global)
            cw.mostrarMsg(msg);
        });
    };

    this.agregarUsuario2 = function (email) {
        $.ajax({
            type: "GET",
            url: "/agregarUsuario/" + email,
            success: function (data) {
                if (data.email != -1) {
                    console.log("Usuario " + email + " ha sido registrado");
                } else {
                    console.log("El email ya está ocupado");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };

    this.obtenerUsuarios = function () {
        $.getJSON("/obtenerUsuarios", function (data) {
            console.log(data);
        });
    };
    this.numeroUsuarios = function () {
        $.getJSON("/numeroUsuarios", function (data) {
            console.log("Numero de usuarios en el sistema es: " + data.num);
        });
    };

    this.usuarioActivo = function (email) {
        $.getJSON("/usuarioActivo/" + email, function (data) {
            if (data.res) {
                console.log("El usuario " + email + " está activo");
            } else {
                console.log("El usuario " + email + " no está activo");
            }
        });
    };

    this.eliminarUsuario = function (email) {
        $.getJSON("/eliminarUsuario/" + email, function (data) {
            if (data.res == email) {
                console.log("El usuario " + email + " ha sido eliminado");
            } else {
                console.log(
                    "El usuario " + email + " no se ha podido eliminar"
                );
            }
        });
    };

    this.countUsers = function () {
        $.ajax({
            type: "GET",
            url: "/countUsers",
            success: function (data) {
                if (data != -1) {
                    console.log("Number of users " + data.num);
                } else {
                    console.log("No user is register yet.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };

    this.enviarJwt = function (jwt) {
        $.ajax({
            type: "POST",
            url: "/enviarJwt",
            data: JSON.stringify({ jwt: jwt }),
            success: function (data) {
                let msg = "El email " + email + " está ocupado";
                if (data.email != -1) {
                    console.log(
                        "Usuario " + data.email + " ha sido registrado"
                    );
                    msg = "Bienvenido al sistema, " + data.email;
                    $.cookie("email", data.email);
                } else {
                    console.log("El email ya está ocupado");
                }
                cw.limpiar();
                cw.mostrarMsg(msg);
            },
            error: function (xhr, textStatus, errorThrown) {
                //console.log(JSON.parse(xhr.responseText));
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
            //dataType:'json'
        });
    };

    this.registrarUsuario = function (email, password) {
        $.ajax({
            type: "POST",
            url: "/registrarUsuario",
            data: JSON.stringify({ email: email, password: password }),
            success: function (data) {
                if (data.email != -1) {
                    console.log(
                        "Usuario " + data.email + " ha sido registrado"
                    );
                    // mostrar un mensaje diciendo: consulta tu email
                    //$.cookie("email",data.email);
                    cw.limpiar();
                    //cw.mostrarMsg("Bienvenido al sistema, "+data.email);
                    cw.mostrarLogin();
                } else {
                    console.log("Hay un usuario registrado con ese email");
                    cw.mostrarMensajeLogin(
                        "Hay un usuario registrado con ese email"
                    );
                    cw.monstrarModalLogin(
                        "Hay un usuario registrado con ese email"
                    );
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };

    this.loginUsuario = function (email, password) {
        $.ajax({
            type: "POST",
            url: "/loginUsuario",
            data: JSON.stringify({ email: email, password: password }),
            success: function (data) {
                if (data.email != -1) {
                    console.log(
                        "Usuario " + data.email + " ha sido registrado"
                    );
                    $.cookie("email", data.email);
                    ws.email = data.email;
                    cw.limpiar();
                    cw.mostrarMsg("Bienvenido al sistema, " + data.email);
                    cw.mostrarLoanOfUser();
                    cw.mostrarCatalog();
                } else {
                    console.log("Usuario o clave incorrectos");
                    cw.mostrarMensajeLogin("Usuario o clave incorrectos");
                    cw.monstrarModalLogin("Usuario o clave incorrectos");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };

    this.cerrarSesion = function () {
        $.getJSON("/cerrarSesion", function () {
            console.log("Sesión cerrada");
            $.removeCookie("email");
        });
    };

    //------------------Book management--------------------------------------------------------
    this.createNewBook = function (isbn, title, author, type) {
        $.ajax({
            type: "POST",
            url: "/createNewBook",
            data: JSON.stringify({
                isbn: isbn,
                title: title,
                author: author,
                type: type,
            }),
            success: function (data) {
                if (
                    data.isbn != -1 &&
                    data.title != -1 &&
                    data.author != -1 &&
                    data.type != -1
                ) {

                    let lineCatalogBooks =
                        '<tr><th scope="row">' +
                        0 +
                        "</th><td>" +
                        data.isbn +
                        "</td><td>" +
                        data.title +
                        '</td><td><button type="button" id="' +
                        data.isbn +
                        '" class="btn btn-outline-warning">+&nbsp;Loan</button></td></tr>';

                    $("#bodyCatalogBooks").append(lineCatalogBooks);
                    cw.monstrarModalNewLoan(data);
                    cw.mostrarMsg("A book has been added.");
                } else {
                    cw.mostrarMsg(
                        "Something went wrong. Please try again...\nThe book you are trying to add may already exists."
                    );
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };

    this.getAllBooks = function () {
        $.ajax({
            type: "GET",
            url: "/getAllBooks",
            success: function (data) {
                if (data.allBooks) {
                    let index = 1;
                    let lineCatalogBooks = "";

                    // Iterate through all elements of the array
                    for (let book of data.allBooks) {
                        lineCatalogBooks =
                            '<tr><th scope="row">' +
                            index +
                            "</th><td>" +
                            book.isbn +
                            "</td><td>" +
                            book.title +
                            '</td><td><button type="button" id="' +
                            book.isbn +
                            '" class="btn btn-outline-warning">+&nbsp;Loan</button></td></tr>';

                        $("#bodyCatalogBooks").append(lineCatalogBooks);
                        index++;

                        cw.monstrarModalNewLoan(book);
                    }
                } else {
                    cw.mostrarMsg("no data.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };

    //------------------Book management--------------------------------------------------------

    //------------------Loan management--------------------------------------------------------

    this.createNewLoan = function (userId, book, returnDate) {
        let loanId = userId + book.isbn;

        $.ajax({
            type: "POST",
            url: "/createNewLoan",
            data: JSON.stringify({
                loanId: loanId,
                userId: userId,
                isbn: book.isbn,
                title: book.title,
                loanDate: new Date(),
                returnDate: returnDate,
            }),
            success: function (data) {
                if (data.loanId != -1 && data.isbn != -1 && data.title != -1) {

                    let lineLoan =
                            '<tr><th scope="row">' +
                            0 +
                            "</th><td>" +
                            data.isbn +
                            "</td><td>" +
                            data.title +
                            '</td><td><button type="button" id="' +
                            data.loanId +
                            '" class="btn btn-outline-danger">-&nbsp;Return</button></td></tr>';

                        $("#bodyCatalogLoans").append(lineLoan);

                    cw.mostrarMsg("A loan has been added.");

                } else {
                    cw.mostrarMsg(
                        "Something went wrong. Please try again...\nThe loan you are trying to add may already exists."
                    );
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };

    this.getAllLoans = function () {
        $.ajax({
            type: "GET",
            url: "/getAllLoans",
            success: function (data) {
                if (data.allLoans) {
                    let index = 1;
                    let lineLoan = "";

                    // Iterate through all elements of the array
                    for (let loan of data.allLoans) {
                        lineLoan =
                            '<tr><th scope="row">' +
                            index +
                            "</th><td>" +
                            loan.isbn +
                            "</td><td>" +
                            loan.title +
                            '</td><td><button type="button" id="' +
                            loan.loanId +
                            '" class="btn btn-outline-danger">-&nbsp;Return</button></td></tr>';

                        $("#bodyCatalogLoans").append(lineLoan);
                        index++;
                    }
                } else {
                    cw.mostrarMsg("no data.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };
    
    this.getLoansByUser = function (userId) {
        $.ajax({
            type: "POST",
            url: "/getLoansByUser",
            data: JSON.stringify({
                userId: userId,
            }),
            success: function (data) {
                if (data.allLoans) {
                    let index = 1;
                    let lineLoan = "";

                    // Iterate through all elements of the array
                    for (let loan of data.allLoans) {
                        lineLoan =
                            '<tr><th scope="row">' +
                            index +
                            "</th><td>" +
                            loan.isbn +
                            "</td><td>" +
                            loan.title +
                            '</td><td><button type="button" id="' +
                            loan.loanId +
                            '" class="btn btn-outline-danger">-&nbsp;Return</button></td></tr>';

                        cw.returnBook(loan);
                        $("#bodyCatalogLoans").append(lineLoan);
                        index++;
                    }
                } else {
                    cw.mostrarMsg("no data.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };

    this.returnBook = function (loanId) {
        $.ajax({
            type: "POST",
            url: "/returnBook",
            data: JSON.stringify({
                loanId: loanId,
            }),
            success: function (data) {
                if (data.result) {
                    cw.mostrarMsg("The book has been returned.");
                } else {
                    cw.mostrarMsg("no loan corresponds.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };

    //------------------Loan management--------------------------------------------------------
}
