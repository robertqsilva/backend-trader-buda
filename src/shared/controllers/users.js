const { criptografarSenha, verificarSenha } = require("../services/cryptography/bcrypt");
const { buscarUsuario, cadastrarUsuarioDb } = require("../services/database/user-servicews");
const { criandoToken } = require("../services/jwt/jwt");

const cadastrarUsuario = async (req, res) => {
  try {
    const {email, senha } = req.body;

    const usuario = await buscarUsuario(email);

    if (usuario) {
      return res.status(400).json({ message: "Usuario já cadastrado" });
    }

    const senhaHash = await criptografarSenha(senha);
    const cadastro = await cadastrarUsuarioDb(email, senhaHash);

    return res.status(201).json(cadastro);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Error interno no servidor"})
  }
};



const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await buscarUsuario(email);

    if (!usuario) {
      return res.status(400).json({ message: "Email ou senha Incorreta" })
    }

    const verificaSenha = await verificarSenha(senha, usuario.senha);

    if (!verificaSenha) {
       return res.status(400).json({ message: "Email ou senha Incorreta" });
    }

    const token = await criandoToken(usuario.id);

    const { senha: _, ...usuarioLogado } = usuario;

    return res.status(200).json({ usuario: usuarioLogado, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "erro interno do servidor" });
  }
};

module.exports = {
  cadastrarUsuario,
  loginUsuario
}