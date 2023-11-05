const nodemailer = require("nodemailer"); // npm install nodemailer
const url = "http://localhost:3000/";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "etoundisebastien@gmail.com",
        pass: "tu-clave-generada", //no es la clave de gmail
    },
});

//send();

module.exports.enviarEmail = async function (direccion, key, men) {
    const result = await transporter.sendMail({
        from: "tu-cuenta@gmail.com",
        to: direccion,
        subject: "Confirmar cuenta",
        text: "Pulsa aquí para confirmar cuenta",
        html:
            '<p>Bienvenido a Sistema</p><p><a href="' +
            url +
            "confirmarUsuario/" +
            direccion +
            "/" +
            key +
            '">Pulsa aquí para confirmar cuenta</a></p>',
    });
    console.log(JSON.stringify(result, null, 4));
};
