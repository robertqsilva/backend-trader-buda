const { verificaToken } = require("../../services/jwt/jwt");

const authTokenRequest = async (req, res) => {
  const { token } = req.body;

  try {
    const tokenValido = await verificaToken(token);

    if (!tokenValido) {
      return res.status(404).json(false);
    }


    return res.status(200).json(true);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = authTokenRequest;
