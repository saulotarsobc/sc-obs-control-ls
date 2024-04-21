import OBSWebSocket from "obs-websocket-js";

export const obs = new OBSWebSocket();

obs.on("ConnectionOpened", () => {
  console.log("Conexão estabelecida com sucesso ao OBS Studio!");
});

obs.on("ConnectionError", (err) => {
  console.error("Erro ao conectar ao OBS Studio:", err);
});
