import OBSWebSocket from "obs-websocket-js";

export class Obs {
  private obs: OBSWebSocket;

  constructor() {
    this.obs = new OBSWebSocket();
  }

  async setCurrentProgramScene(sceneName: string) {
    await this.obs
      .call("SetCurrentProgramScene", {
        sceneName: sceneName,
      })
      .then((data) => console.log("CENA ALTERADA", sceneName, data))
      .catch((e: Error) => console.error("ERRO AO MUDAR CENA", e.message));
  }

  async connect(url: string, password: string, options?: any) {
    try {
      await this.obs.connect(url, password, options);
      console.log("Conexão estabelecida com sucesso ao OBS Studio!");
    } catch (error) {
      console.error("Erro ao conectar ao OBS Studio:", error);
    }
  }

  async disconnect() {
    try {
      await this.obs.disconnect();
      console.log("DESCONECTADO");
    } catch (error) {
      console.error("FALHA AO DESCONECTAR", error);
    }
  }

  async setupEventListeners() {
    this.obs.on("Identified", () => {
      console.log("Identificado");
    });

    this.obs.on("ConnectionError", (err: Error) => {
      console.error("Erro ao conectar ao OBS Studio:", err);
    });
  }

  async checkConnectionStatus(): Promise<{
    status: boolean;
    sceneName?: string;
    sceneUuid?: string;
    currentProgramSceneName?: string;
    currentProgramSceneUuid?: string;
  }> {
    try {
      const data = await this.obs.call("GetCurrentProgramScene");
      return { status: true, ...data };
    } catch (error) {
      return { status: false };
    }
  }
}
