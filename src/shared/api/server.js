require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routers/router");
const socket = require("../api/socket/socket");

const app = express();
app.use(cors());

app.use(express.json());
app.use(router);

cron.schedule("*/2 * * * *", () => {
  axios
    .get("https://api-fortune-tig.onrender.com/bot")
    .then((response) => {
      console.log("Solicitação de manutenção enviada com sucesso");
    })
    .catch((error) => {
      console.error(
        "Erro ao enviar a solicitação de manutenção:",
        error.message
      );
    });
});

socket.listen(process.env.PORT_SOCKET || 4000);
app.listen(process.env.PORT);
