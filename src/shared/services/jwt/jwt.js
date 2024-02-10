const jwt = require("jsonwebtoken");

module.exports = {
  criandoToken: async (usuarioId) => {
    const token = jwt.sign({ id: usuarioId }, process.env.JWT_PASS, {
      expiresIn: "1d",
    });
    return token;
  },
  verificaToken: async (token) => {
    const tokenValido = jwt.verify(
      token,
      process.env.JWT_PASS,
      (err, usuario) => {
        if (err) {
          return false;
        }
        return usuario 
      }
    );
    return tokenValido;
  },
};
