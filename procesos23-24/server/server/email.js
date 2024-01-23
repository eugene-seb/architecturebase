const nodemailer = require("nodemailer"); // npm install nodemailer
const url = "http://localhost:3001/";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "azertytreize@gmail.com",
        pass: "awpa tyjs doxs qiok",
    },
});

//send();

module.exports.enviarEmail = async function (direccion, key, men) {

    const confirmationLink = `${url}confirmarUsuario/${direccion}/${key}`;

    const result = await transporter.sendMail({
        from: "azertytreize@gmail.com",
        to: direccion,
        subject: "Account confirmation",
        text: "Click here to confirm your account",
        html: `<p>Welcome to the Loan management system</p><p><a href="${confirmationLink}">Click here to confirm your account</a></p>`,
    });
};
