import tileLightImg from "./slot_light.png";
import tileDarkImg from "./slot_dark.png";
import boardBearImg from "./board_bear.png";
import blockImg from "./block.png";
import castleImg from "./castle.png";
import diceImg from "./dice_small.png";
import { Fonts } from "@/TwClassnames/Fonts";

const TILE_WIDTH = 140;
const TILE_HEIGHT = 101;

const BOARD_OFFSET = 70;

type Direction = "up" | "down" | "left" | "right";

const path: {
  direction: Direction;
  count: number;
  type: "normal" | "portal";
}[] = [
  { direction: "right", count: 5, type: "normal" },
  { direction: "up", count: 5, type: "normal" },
  { direction: "right", count: 4, type: "normal" },
  { direction: "up", count: 3, type: "normal" },
  { direction: "right", count: 5, type: "normal" },
  { direction: "up", count: 5, type: "normal" },
  { direction: "right", count: 5, type: "normal" },
  { direction: "up", count: 3, type: "normal" },
  { direction: "right", count: 2, type: "normal" },
  { direction: "up", count: 5, type: "normal" },
  { direction: "right", count: 4, type: "normal" },
  { direction: "up", count: 4, type: "normal" },
  { direction: "right", count: 5, type: "normal" },
  { direction: "up", count: 5, type: "normal" },
  { direction: "right", count: 5, type: "normal" },
  { direction: "up", count: 5, type: "normal" },
  { direction: "right", count: 5, type: "normal" },
  { direction: "up", count: 5, type: "normal" },
  { direction: "right", count: 5, type: "normal" },
  { direction: "up", count: 5, type: "normal" },
];

const directionOffset = (dir: Direction) => {
  const xOffset = TILE_WIDTH * 0.5;
  const yOffset = TILE_HEIGHT / 2.5;

  switch (dir) {
    case "up":
      return { dx: -xOffset, dy: -yOffset };
    case "down":
      return { dx: xOffset, dy: yOffset };
    case "left":
      return { dx: -xOffset, dy: yOffset };
    case "right":
      return { dx: xOffset, dy: -yOffset };
    default:
      return { dx: 0, dy: 0 };
  }
};

const getIsometricPositions = () => {
  const positions: { x: number; y: number; index: number }[] = [];
  let x = 0;
  let y = 0;
  let index = 0;

  path.forEach(({ direction, count }) => {
    const { dx, dy } = directionOffset(direction);
    for (let i = 0; i < count; i++) {
      positions.push({ x, y, index: index + 1 });
      x += dx;
      y += dy;
      index++;
    }
  });

  return positions;
};

export default function Board({
  currentPosition,
}: {
  currentPosition: number;
}) {
  const slots = getIsometricPositions();
  const currentTile = slots.find((slot) => slot.index === currentPosition);

  // Normalize to fit inside container
  const minX = Math.min(...slots.map((s) => s.x));
  const minY = Math.min(...slots.map((s) => s.y));
  const width =
    Math.max(...slots.map((s) => s.x)) - minX + TILE_WIDTH + BOARD_OFFSET;
  const height = Math.max(...slots.map((s) => s.y)) - minY + TILE_HEIGHT + 350;

  return (
    <div
      className="relative bg-green-100 border border-black p-5 mx-auto mt-10 h-fit"
      style={{
        width,
        height,
      }}
    >
      <img src={castleImg} className="absolute top-0 left-0 z-[125]" />

      {slots.map((slot, i) => {
        const tileSrc = i % 2 === 0 ? tileLightImg : tileDarkImg;
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${slot.x - minX}px`,
              top: `${slot.y - minY}px`,
              width: TILE_WIDTH,
              height: TILE_HEIGHT,
            }}
          >
            <img
              src={tileSrc}
              alt={`Tile ${slot.index}`}
              style={{
                width: TILE_WIDTH,
                height: TILE_HEIGHT,
                zIndex: 200 - i,
                position: "absolute",
                left: BOARD_OFFSET,
                top: 0,
              }}
            />
            <img
              src={blockImg}
              alt={`block ${slot.index}`}
              className=""
              style={{
                width: 140,
                height: 356,
                zIndex: 200 - i,
                position: "absolute",
                left: BOARD_OFFSET,
                top: "56%",
              }}
            />
            {/* Render the tile number overlay unless the board bear is on this tile */}
            {(!currentTile || currentTile.index !== slot.index) && (
              <div
                className={`${Fonts.pip.super_cartoon.h4} absolute z-[200] w-full h-full bottom-[10%] left-[95%]	
								[text-shadow:0px_3px_0px_#FFF] text-center flex items-center skew-x-12 perspective-600px rotateX-60deg`}
              >
                {slot.index}
              </div>
            )}
          </div>
        );
      })}
      {currentTile && (
        <img
          src={boardBearImg}
          alt="Board Bear"
          className="absolute"
          style={{
            width: 75,
            height: 132,
            left: `${
              currentTile.x + BOARD_OFFSET - minX + TILE_WIDTH / 2 - 75 / 2
            }px`,
            top: `${currentTile.y - minY + TILE_HEIGHT - 160}px`,
            // Make sure this image appears above other tiles.
            zIndex: 300,
          }}
        />
      )}
      <div className="bg-[#0075FF] rounded-xl absolute bottom-5 right-5 p-4 border-[2px] border-[#005FCC]">
        <img src={diceImg} className="w-10 h-10" />
      </div>
    </div>
  );
}
