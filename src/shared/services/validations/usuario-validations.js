const joi = require('joi')

const usuario = {
  cadastroUsuario: joi.object({
    email: joi.string().email().required().messages({
      "any.required": "O campo email é obrigatorio",
      "string.empty": "O campo email não pode ficar vazio",
      "string.email": "Formato de email invalido",
      "string.base": "O campo email tem que ser uma string",
    }),

    senha: joi.string().min(5).required().messages({
      "any.required": "A senha é obrigatoria",
      "string.empty": "O campo senha não pode ficar vazio",
      "string.min": "O campo senha tem que ter no minimo 5 caracteres",
      "string.base": "A senha tem que ser uma string",
    }),
  }),

  loginUsuario: joi.object({
    email: joi.string().email().required().messages({
      "string.base": "O campo email deve ser uma string",
      "string.email": "Deve ser um email válido",
      "any.required": "O campo email é obrigatório",
      "string.empty": "O campo email não pode estar vazio.",
    }),
    senha: joi.string().min(5).required().messages({
      "string.min": "A senha deve ter no mínimo 5 caracteres",
      "string.base": "O campo senha deve ser uma string",
      "any.required": "O campo senha é obrigatório",
      "string.empty": "O campo senha não pode estar vazio.",
    }),
  }),
};

module.exports = usuario