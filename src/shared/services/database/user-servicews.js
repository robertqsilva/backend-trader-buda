const knex = require('./knex')


module.exports = {
    cadastrarUsuarioDb: async (email, senha) => {
        const cadastro = await knex("usuarios")
          .returning(["id", "email"])
          .insert({ email, senha });

        return cadastro[0]
    },


    buscarUsuario: async (email) => {
        const usuario = await knex("usuarios").where({ email }).first();

        return usuario
    }
}