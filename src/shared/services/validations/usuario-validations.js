const joi = require("joi");

const usuario = {
  cadastroUsuario: joi.object({
    nome: joi.string().required().messages({
      "any.required": "O campo nome é obrigatorio",
      "string.empty": "O campo nome não pode ficar vazio",
      "string.base": "O campo nome tem que ser uma string",
    }),
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
    url: joi.string().required().messages({
      "any.required": "A url é obrigatoria",
      "string.empty": "O campo url não pode ficar vazio",
      "string.base": "A url tem que ser uma string",
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

  forgotPassword: joi.object({
    email: joi.string().email().required().messages({
      "string.base": "O campo email deve ser uma string",
      "string.email": "Deve ser um email válido",
      "any.required": "O campo email é obrigatório",
      "string.empty": "O campo email não pode estar vazio.",
    }),
    url: joi.string().required().messages({
      "string.base": "O campo urlClient deve ser uma string",
      "any.required": "O campo urlClient é obrigatório",
      "string.empty": "O campo urlClient não pode estar vazio.",
    }),
  }),

  forgotPasswordAtualizacao: joi.object({
    senha: joi.string().min(5).required().messages({
      "any.required": "A senha é obrigatoria",
      "string.empty": "O campo senha não pode ficar vazio",
      "string.min": "O campo senha tem que ter no minimo 5 caracteres",
      "string.base": "A senha tem que ser uma string",
    }),
  }),
};

module.exports = usuario;
