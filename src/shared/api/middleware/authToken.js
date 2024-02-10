const { verificaToken } = require("../../services/jwt/jwt");

const verificaLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(400)
      .json({
        message:
          "Para acessar este recurso um token de autenticação válido deve ser enviado",
      });
  }
  const token = authorization.split(" ")[1];
  try {
    const validaToken = await verificaToken(token);

    if (!validaToken) {
      return res.status(403).json({
        message:
          "Para acessar este recurso um token de autenticação válido deve ser enviado",
      });
    }
    req.usuario = validaToken;

    next();
  } catch (error) {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado",
    });
  }
};

module.exports = verificaLogin;
