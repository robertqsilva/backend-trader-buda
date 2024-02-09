const TelegramBot = require("node-telegram-bot-api");
const http = require("http");
const socketIO = require("socket.io");

  const token = process.env.TOKEN_TELEGRAM;
  const bot = new TelegramBot(token, { polling: true });
  const server = http.createServer();
  const io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Cliente conectado");

    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });

  bot.on("message", (msg) => {
    if (msg.chat.id.toString() === "991335504") {
      const data = msg.text.split("\n");
      const currency = data[0].split(": ")[1].split(" ")[0].trim();
      const direction = data[1].split(": ")[1].split(" ")[0].trim();
      const time = data[2].split(": ")[1].split(" ")[0].trim();

      const resposta = {
        currency,
        direction,
        time,
      };

      io.emit("message", resposta);
    }
  });

module.exports = server
