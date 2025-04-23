import { useEffect, useRef, useState } from "react";
import Board from "./Board";
import { Fonts } from "@/TwClassnames/Fonts";

function TowerLayout() {
  const [currentPosition, setCurrentPosition] = useState(5);

  const boardContainerRef = useRef<HTMLDivElement>(null);

  const tileRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const targetTile = tileRefs.current[currentPosition];
    if (targetTile && boardContainerRef.current) {
      targetTile.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentPosition]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const players: any[] = [1, 1, 1, 1, 1, 1, 22, 2, 2, 2, 2, 22, 2, 2];

  return (
    <div className="flex mx-auto w-fit">
      <div className="flex flex-col w-[20vw] gap-y-3">
        <div className="p-4 flex bg-white rounded-2xl justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-pip-blue-dark"></div>
            <p className="font-super-comic text-base">Chris</p>
          </div>
          <p className={`${Fonts.pip.super_cartoon.h4} text-pip-blue-dark`}>
            {currentPosition}
          </p>
        </div>

        <div className="flex flex-col gap-4 bg-white rounded-2xl h-[50vh] overflow-y-scroll">
          {players.map(() => (
            <div className="p-4 flex bg-white justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-pip-blue-dark"></div>
                <p className="font-super-comic text-base">Chris</p>
              </div>
              <p className={`${Fonts.pip.super_cartoon.h4} text-pip-blue-dark`}>
                {currentPosition}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div
        ref={boardContainerRef}
        className="h-[70vh] rounded-2xl border-[4px] border-white overflow-y-hidden overflow-x-hidden"
      >
        <Board
          setTileRef={(el, index) => (tileRefs.current[index] = el)}
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
        />
      </div>
      <div className="w-[10vw] flex flex-col gap-y-3 ml-3">
        <div className="rounded-2xl w-24 h-24 border-[2px] border-white bg-pip-gray-100 py-4">
          <p className="font-funnel-bold text-3xl text-pip-blue-dark text-center">
            {currentPosition}
          </p>
          <p className="font-funnel-bold text-bas text-center">Position</p>
        </div>
        <div className="rounded-2xl w-24 h-24 border-[2px] border-white bg-pip-gray-100 py-4">
          <p className="font-funnel-bold text-3xl text-pip-blue-dark text-center">
            2
          </p>
          <p className="font-funnel-bold text-base text-center">Dice rolls</p>
        </div>
        <div className="rounded-2xl w-24 h-24 border-[2px] border-white bg-pip-gray-100 py-4">
          <p className="font-funnel-bold text-3xl text-pip-blue-dark text-center">
            3
          </p>
          <p className="font-funnel-bold text-base text-center">Days left</p>
        </div>
      </div>
    </div>
  );
}

export default TowerLayout;
