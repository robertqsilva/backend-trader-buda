const bcrypt = require("bcrypt");

module.exports = {
  criptografarSenha: async (senha) => {
    return await bcrypt.hash(senha, 10);
  },

  verificarSenha: async (senha, hash) => {
    return await bcrypt.compare(senha, hash);
  },
};
