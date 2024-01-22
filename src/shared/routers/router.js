const {Router } = require('express')
const usuario = require('../controllers/users')
const validaRequisicao = require("../middleware/valid-body");
const user_schema = require('../services/validations/usuario-validations')

const router = Router()

router.post(
  "/api/cadastro",
  validaRequisicao(user_schema.cadastroUsuario),
  usuario.cadastrarUsuario
);
router.post('/api/login', validaRequisicao(user_schema.loginUsuario), usuario.loginUsuario)

module.exports = router