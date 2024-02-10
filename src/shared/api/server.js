require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routers/router");
const cron = require("node-cron");
const axios = require("axios");
const app = express();


app.use(cors({
  origin: 'https://sniperbuda.onrender.com',
  optionsSuccessStatus: 200 
}));

app.use(express.json());
app.use(router);

cron.schedule("*/2 * * * *", () => {
  axios
    .get("https://buda-3k1x.onrender.com")
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
app.listen(process.env.PORT);
