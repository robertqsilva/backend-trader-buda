const compiladorHtml = require("./compiladorHtml");
const transportador = require("../../../config/mail/trasportador");


async function envioEmailConfirmaçãoCadastro(nome, link, email) {
  const path = "./src/model/html/tokencadastro.html";
  const htmlPage = await compiladorHtml(path, {
    nome,
    link,
  });

  transportador.sendMail({
    from: `Sniper Buda <${process.env.MAIL_FROM}`,
    to: `${nome} <${email}>`,
    subject: "Confirmação de cadastro",
    html: htmlPage,
  });
}
async function envioEmailNovaSenha(nome, link, email) {
  const path = "./src/model/html/codNewPass.html";
  const htmlPage = await compiladorHtml(path, {
    nome,
    link,
  });

  transportador.sendMail({
    from: `Sniper Buda <${process.env.MAIL_FROM}`,
    to: `${nome} <${email}>`,
    subject: "Recuperação de senha",
    html: htmlPage,
  });
}


module.exports = {envioEmailConfirmaçãoCadastro, envioEmailNovaSenha}
