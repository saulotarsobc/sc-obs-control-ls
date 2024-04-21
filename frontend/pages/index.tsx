import { obs } from "@/obs";
import { useState } from "react";

export default function Home() {
  const [list, setList] = useState<any>([]);

  const handleClick = async (target: string) => {
    console.log({ target });

    await obs.connect("ws:127.0.0.1:4455", "asdf1234", {
      rpcVersion: 1,
    });

    obs.on("Identified", async () => {
      console.log("Identified");
      await obs
        .call("GetSceneList")
        .then((data) => {
          console.log(data);
          setList(data);
        })
        .catch((e) => console.error(e));
    });
  };

  return (
    <main className="bg-slate-900 flex flex-row gap-2 justify-center items-center h-screen w-screen">
      <div id="col-1" className="flex flex-col gap-2">
        <div
          className="bg-orange-500 text-white rounded-md border h-24 aspect-video flex justify-center items-center"
          onClick={() => handleClick("jw")}
        >
          JW
        </div>
        <div
          className="bg-green-500 text-white rounded-md border h-24 aspect-video flex justify-center items-center"
          onClick={() => handleClick("next")}
        >
          INTELBRAS NEXT
        </div>
      </div>

      <div id="col-2" className="flex flex-col gap-2">
        <div
          className="bg-slate-800 text-white rounded-md border h-24 aspect-video flex justify-center items-center"
          onClick={() => handleClick("text")}
        >
          {list}
        </div>

        <div
          className="bg-slate-800 text-white rounded-md border h-24 aspect-video flex justify-center items-center"
          onClick={() => handleClick("text")}
        >
          TEXTO DO ANO
        </div>
      </div>

      <div id="col-3" className="flex flex-col gap-2">
        <div
          className="bg-blue-500 text-white rounded-md border h-24 aspect-video flex justify-center items-center"
          onClick={() => handleClick("zoom-1")}
        >
          ZOOM 1
        </div>
        <div
          className="bg-blue-500 text-white rounded-md border h-24 aspect-video flex justify-center items-center"
          onClick={() => handleClick("zoom-2")}
        >
          ZOOM 2
        </div>
      </div>
    </main>
  );
}
