const knex = require("../../../config/knex/knex");

module.exports = {
  cadastrarUsuarioDb: async (nome, email, senha) => {
    const cadastro = await knex("usuarios")
      .returning(["id", "nome", "email"])
      .insert({ nome, email, senha });

    return cadastro[0];
  },

  buscarUsuario: async (email) => {
    const usuario = await knex("usuarios").where({ email }).first();

    return usuario;
  },
  atualizarSenha: async (id, email, senha) => {
    const usuario = await knex("usuarios").where({ id, email}).update({ senha });
  },

  cadastrarUsuarioNovosUsuario: async (id, nome, email, senha) => {
    const cadastro = await knex("novosusuarios").insert({
      id,
      nome,
      email,
      senha,
    });
  },

  buscarUsuarioNovosUsuarios: async (id) => {
    const usuario = await knex("novosusuarios").where({ id }).first();
    return usuario;
  },
  buscarUsuarioNovosUsuariosEmail: async (email) => {
    const usuario = await knex("novosusuarios").where({ email }).first();
    return usuario;
  },

  atualizarUsuarioNovosUsuarios: async (id, nome, email, senha) => {
    const usuario = await knex("novosusuarios")
      .where({ email })
      .update({ id, nome, email, senha });
  },

  deletarUsuarioNovosUsuarios: async (id) => {
    await knex("novosusuarios").where({ id }).delete();
  },

  inserirSenhaForgot: async (token, id, email) => {
    const usuario = await knex("forgot")
      .insert({ token, id, email })
      .returning(["token", "id", "email"]);

    return usuario[0];
  },

  buscarUsuarioForgot: async (token) => {
    const usuario = await knex("forgot").where({ token }).first();

    return usuario;
  },

  deletarUsuarioForgot: async (token) => {
    const usuario = await knex("forgot").where({ token }).delete();
  },

  buscarUsuarioForgotByEmail: async (email) => {
    const usuario = await knex("forgot").where({ email }).first();
    return usuario;
  },

  atualizarUsuarioForgot: async (token, id, email) => {
    const usuario = await knex("forgot")
      .where({ email })
      .update({ id, token, email });
  },
};
