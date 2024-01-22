const validaRequisicao = (joyschema) => async (req, res, next) => {
  try {
    await joyschema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = validaRequisicao;
