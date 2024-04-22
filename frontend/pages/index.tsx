import { Obs } from "@/obs";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<boolean>(false);
  const [currentScene, setCurrentScene] = useState<string | undefined>("");
  const obs = useRef<Obs>(new Obs());

  const handleLogin = useCallback(async () => {
    await obs.current.connect("ws://127.0.0.1:4455", "asdf1234");
    await obs.current.setupEventListeners();
  }, []);

  const handleLogout = useCallback(async () => {
    await obs.current.disconnect();
  }, []);

  const handleChangeSchene = async (target: string) => {
    await obs.current.setCurrentProgramScene(target);
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const data = await obs.current.checkConnectionStatus();
        setCurrentScene(data.currentProgramSceneName);
        setStatus(data.status);
      } catch (error) {
        console.warn("DESLOGADO");
        setCurrentScene(undefined);
        setStatus(false);
      }
    }, 300);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="h-screen w-screen bg-slate-900 flex flex-col justify-center items-center">
      <div className="h-12 w-full flex justify-center items-center">
        {status ? (
          <div className="h-2 animate-ping aspect-square bg-green-400 rounded-full"></div>
        ) : (
          <div className="h-3 aspect-square bg-red-400 rounded-full"></div>
        )}
      </div>

      <main className="flex flex-row gap-1 w-full p-1 justify-center items-center">
        <div id="col-1" className="flex flex-col gap-1">
          <div
            className={`${
              currentScene == "jw" && "bg-orange-500"
            } text-white rounded-md border-2 h-24 aspect-video flex justify-center items-center`}
            onClick={() => handleChangeSchene("jw")}
          >
            JW
          </div>
          <div
            className={`${
              currentScene == "next" && "bg-green-500"
            } text-white rounded-md border-2 h-24 aspect-video flex justify-center items-center`}
            onClick={() => handleChangeSchene("next")}
          >
            INTELBRAS NEXT
          </div>
        </div>

        <div id="col-2" className="flex flex-col gap-1">
          <div
            className={`${
              currentScene == "text" && "bg-slate-600"
            } text-white rounded-md border-2 h-24 aspect-video flex justify-center items-center`}
            onClick={() => handleChangeSchene("text")}
          >
            TEXTO DO ANO
          </div>

          <div className="h-24 aspect-video flex flex-col gap-1 justify-center items-center">
            <input
              className="text-white border px-3 h-8 w-32 rounded-md bg-blue-900 hover:scale-105 transition"
              type="button"
              value="Login"
              onClick={handleLogin}
            />

            <input
              className="text-white border px-3 h-8 w-32 rounded-md bg-red-900 hover:scale-105 transition"
              type="button"
              value="Logout"
              onClick={handleLogout}
            />
          </div>
        </div>

        <div id="col-3" className="flex flex-col gap-1">
          <div
            className={`${
              currentScene == "zoom-1" && "bg-blue-500"
            } text-white rounded-md border-2 h-24 aspect-video flex justify-center items-center`}
            onClick={() => handleChangeSchene("zoom-1")}
          >
            ZOOM 1
          </div>
          <div
            className={`${
              currentScene == "zoom-2" && "bg-blue-500"
            } text-white rounded-md border-2 h-24 aspect-video flex justify-center items-center`}
            onClick={() => handleChangeSchene("zoom-2")}
          >
            ZOOM 2
          </div>
        </div>
      </main>
    </div>
  );
}
