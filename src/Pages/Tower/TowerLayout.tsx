import { useState } from "react";
import Board from "./Board";

function TowerLayout() {
  const [currentPosition, setCurrentPosition] = useState(5);

  return (
    <>
      <button onClick={() => setCurrentPosition(currentPosition + 1)}>
        {" "}
        + 1
      </button>
      <div className="overflow-y-scroll h-[70vh]">
        <Board currentPosition={currentPosition} />
      </div>
    </>
  );
}

export default TowerLayout;
