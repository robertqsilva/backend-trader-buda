const crypto = require('crypto')

module.exports = {
  tokenAuthCadastro: () => crypto.randomBytes(16).toString("hex"),
  tokenAuthNovasenha: () => crypto.randomBytes(20).toString("hex"),
};