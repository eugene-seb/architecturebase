const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const client = new SecretManagerServiceClient();

async function accessCLAVECORREO() {
    const name = "projects/590521076034/secrets/azertytreize/versions/1";
    const [version] = await client.accessSecretVersion({
        name: name,
    });
    const datos = version.payload.data.toString("utf8");
    return datos;
}
module.exports.obtenerOptions = async function (callback) {
    let options = { user: "", pass: "" };
    let user = await accessCLAVECORREO();
    options.user = user;
    options.pass = pass;
    callback(options);
};
