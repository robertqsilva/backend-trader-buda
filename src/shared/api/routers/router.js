const { Router } = require("express");
const usuario = require("../controllers/users");
const validaRequisicao = require("../middleware/valid-body");
const user_schema = require("../../services/validations/usuario-validations");
const authTokenRequest = require("../controllers/token");
const socket = require("../socket/socket");

const router = Router();

router.post(
  "/api/cadastro/",
  validaRequisicao(user_schema.cadastroUsuario),
  usuario.cadastrarUsuario
);
router.post(
  "/api/login",
  validaRequisicao(user_schema.loginUsuario),
  usuario.loginUsuario
);

router.get("/api/confirmacao/:token", usuario.confirmacaoCodigoCadastro);

router.post("/api/auth/token", authTokenRequest);

router.post(
  "/api/forgot/email",
  validaRequisicao(user_schema.forgotPassword),
  usuario.recuperacaoDeSenha
);
router.post(
  "/api/forgot/confirmacao/:token",
  validaRequisicao(user_schema.forgotPasswordAtualizacao),
  usuario.cadastrandoNovaSenha
);

router.get('/', (req, res) => res.json("Bem vindo a api"))


module.exports = router;
