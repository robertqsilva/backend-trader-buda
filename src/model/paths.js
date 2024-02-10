const path = require("path");
module.exports = {
  emailErrorLink: path.join(
    __dirname,
    "../../src/model/error/linkConfirmacaoError.html"
  ),
  emailSucessLink: path.join(
    __dirname,
    "../../src/model/html/sucessLInkCadastro.html"
  ),
};
