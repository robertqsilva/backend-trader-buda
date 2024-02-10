const {
  criptografarSenha,
  verificarSenha,
} = require("../../services/cryptography/bcrypt");

const {
  buscarUsuario,
  cadastrarUsuarioDb,
  cadastrarUsuarioNovosUsuario,
  buscarUsuarioNovosUsuarios,
  buscarUsuarioNovosUsuariosEmail,
  atualizarUsuarioNovosUsuarios,
  deletarUsuarioNovosUsuarios,
  inserirSenhaForgot,
  buscarUsuarioForgot,
  atualizarSenha,
  deletarUsuarioForgot,
  buscarUsuarioForgotByEmail,
  atualizarUsuarioForgot,
} = require("../../services/database/user-servicews");

const { criandoToken } = require("../../services/jwt/jwt");
const envioemail = require("../../services/mail/envio");
const {
  tokenAuthCadastro,
  tokenAuthNovasenha,
} = require("../../utils/tokenValidacaoUrl");

const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, url } = req.body;

    const usuario = await buscarUsuario(email);

    if (usuario) {
      return res.status(400).json({ mensagem: "Usuário já cadastrado" });
    }

    const token = tokenAuthCadastro();

    const urlEnvio = `${url}?token=${token}`;
    const envioEmail = await envioemail.envioEmailConfirmaçãoCadastro(
      nome,
      urlEnvio,
      email
    );

    const usuarioExistente = await buscarUsuarioNovosUsuariosEmail(email);

    const senhaHash = await criptografarSenha(senha);
    if (usuarioExistente) {
      const recadastro = await atualizarUsuarioNovosUsuarios(
        token,
        nome,
        email,
        senhaHash
      );
      return res.status(200).json("Link de confirmação enviado");
    }

    const cadastroTemp = await cadastrarUsuarioNovosUsuario(
      token,
      nome,
      email,
      senhaHash
    );

    return res.status(200).json("Link de confirmação enviado");
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

const confirmacaoCodigoCadastro = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await buscarUsuarioNovosUsuarios(token);

    if (!user) {
      return res.status(404).json({ mensagem: "Token invalido" });
    }

    const usuario = await buscarUsuario(user.email);

    if (usuario) {
      return res.status(400).json({ mensagem: "Usuário já cadastrado" });
    }

    const { nome, email, senha } = user;

    const cadastro = await cadastrarUsuarioDb(nome, email, senha);
    const deletarUsuarioDoTemp = await deletarUsuarioNovosUsuarios(token);

    return res.status(201).json(cadastro);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await buscarUsuario(email);

    if (!usuario) {
      return res.status(400).json({ mensagem: "Email ou senha Incorreta" });
    }

    const verificaSenha = await verificarSenha(senha, usuario.senha);

    if (!verificaSenha) {
      return res.status(400).json({ mensagem: "Email ou senha Incorreta" });
    }

    const token = await criandoToken(usuario.id);

    const { senha: _, ...usuarioLogado } = usuario;

    return res.status(200).json({ user: usuarioLogado, token });
  } catch (error) {
    return res.status(500).json({ mensagem: "erro interno do servidor" });
  }
};

const recuperacaoDeSenha = async (req, res) => {
  const { email, url } = req.body;

  try {
    const user = await buscarUsuario(email);

    if (!user) {
      return res.status(400).json({ mensagem: "Usuario não encontado" });
    }

    const token = tokenAuthNovasenha();

    const urlEnvio = `${url}?token=${token}`;

    const envioDeEmailFc = async () => {
      await envioemail.envioEmailNovaSenha(user.nome, urlEnvio, email);
    };

    const usuarioExistente = await buscarUsuarioForgotByEmail(email);

    if (usuarioExistente) {
      const recadastro = await atualizarUsuarioForgot(token, user.id, email);
      envioDeEmailFc();
      return res.status(200).json("Email enviado com sucesso");
    }

    const trocarSenhaTemp = await inserirSenhaForgot(token, user.id, email);
    envioDeEmailFc();

    return res.status(200).json({ mensagem: "Email enviado com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: "erro interno do servidor" });
  }
};

const cadastrandoNovaSenha = async (req, res) => {
  const { token } = req.params;
  const { senha } = req.body;


  try {
    const usuario = await buscarUsuarioForgot(token);

    if (!usuario) {
      return res.status(404).json({ mensagem: "Token invalido" });
    }

    const { id, email } = usuario;
    const senhaHash = await criptografarSenha(senha);
    const atualizarNovaSenha = await atualizarSenha(id, email, senhaHash);
    const deltarUsuarioDeForgot = await deletarUsuarioForgot(token);

    return res.status(200).json({ mensagem: "Senha atualizada" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = {
  cadastrarUsuario,
  loginUsuario,
  confirmacaoCodigoCadastro,
  recuperacaoDeSenha,
  cadastrandoNovaSenha,
};
