import tileLightImg from "./slot_light.png";
import diceGif from "./dice-animation.gif";
import tileDarkImg from "./slot_dark.png";
import tileLightPortalImg from "./light_portal.png";
import tileDarkPortalImg from "./dark_portal.png";
import boardBearImg from "./board_bear.png";
import blockImg from "./block.png";
import castleImg from "./castle.png";
import diceImg from "./dice_small.png";
import { Fonts } from "@/TwClassnames/Fonts";
import { useEffect, useState } from "react";
import Modal from "@/Components/Modal";
import ReactConfetti from "react-confetti";

export const TILE_WIDTH = 140;
export const TILE_HEIGHT = 101;
export const BOARD_OFFSET = 70;

type Direction = "up" | "down" | "left" | "right";
type TileType = "normal" | "portal";

const path: {
  direction: Direction;
  count: number;
  type: TileType;
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
  { direction: "right", count: 1, type: "portal" },
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
  const positions: { x: number; y: number; index: number; type: TileType }[] =
    [];
  let x = 0;
  let y = 0;
  let index = 0;

  path.forEach(({ direction, count, type }) => {
    const { dx, dy } = directionOffset(direction);
    for (let i = 0; i < count; i++) {
      positions.push({ x, y, index: index + 1, type });
      x += dx;
      y += dy;
      index++;
    }
  });

  return positions;
};

export default function Board({
  setTileRef,
  currentPosition,
  setCurrentPosition,
}: {
  setTileRef: (el: HTMLDivElement | null, index: number) => void;
  currentPosition: number;
  setCurrentPosition: (position: number) => void;
}) {
  const slots = getIsometricPositions();
  const currentTile = slots.find((slot) => slot.index === currentPosition);
  const [roll, setRoll] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const minX = Math.min(...slots.map((s) => s.x));
  const minY = Math.min(...slots.map((s) => s.y));
  const width =
    Math.max(...slots.map((s) => s.x)) - minX + TILE_WIDTH + BOARD_OFFSET;
  const height = Math.max(...slots.map((s) => s.y)) - minY + TILE_HEIGHT + 350;

  const [openDiceModal, setOpenDiceModal] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [gifKey, setGifKey] = useState(0);

  const handleDiceClick = () => {
    setOpenDiceModal(true);
    setGifKey((prevKey) => prevKey + 1);
  };

  const handleCloseModal = () => {
    setOpenDiceModal(false);
    setShowGif(false); // Reset GIF state when modal closes
  };

  useEffect(() => {
    if (openDiceModal) {
      setShowGif(true);
      setRoll(0);
      setShowConfetti(false);
      const timeout = setTimeout(() => {
        setShowGif(false);
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        if (diceRoll === 6) {
          setShowConfetti(true);
        }
        setRoll(diceRoll);
        const newPosition = currentPosition + diceRoll;
        setCurrentPosition(newPosition);
      }, 3000); // hide after 3 seconds
      return () => clearTimeout(timeout);
    }
  }, [openDiceModal]);

  return (
    <>
      <div
        className="relative bg-green-100 border border-black p-5 mx-auto h-fit rounded-2xl"
        style={{ width, height }}
      >
        <img src={castleImg} className="absolute top-0 left-0 z-[125]" />

        {slots.map((slot, i) => {
          const isLight = i % 2 === 0;
          const tileSrc =
            slot.type === "portal"
              ? isLight
                ? tileLightPortalImg
                : tileDarkPortalImg
              : isLight
              ? tileLightImg
              : tileDarkImg;

          return (
            <div
              key={i}
              className="absolute"
              ref={(el) => setTileRef(el, i)}
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
                style={{
                  width: TILE_WIDTH,
                  height: TILE_HEIGHT * 3.5,
                  zIndex: 200 - i,
                  position: "absolute",
                  left: BOARD_OFFSET,
                  top: "56%",
                }}
              />
              {(!currentTile ||
                (currentTile.index !== slot.index &&
                  slot.type === "normal")) && (
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
                currentTile.x + BOARD_OFFSET - minX + TILE_WIDTH / 2 - 37.5
              }px`,
              top: `${currentTile.y - minY + TILE_HEIGHT - 160}px`,
              zIndex: 300,
            }}
          />
        )}
        <div
          className="bg-[#0075FF] hover:bg-[#005FCC] hover:cursor-pointer 
				rounded-xl fixed left-[70%] bottom-[20%]
				z-[300] translate-x-[-50%] p-4 border-[2px] border-[#005FCC]"
          onClick={handleDiceClick}
        >
          <img src={diceImg} className="w-10 h-10" />
        </div>
      </div>
      <Modal
        isOpen={openDiceModal}
        closeModal={handleCloseModal}
        wrapperStyle="w-[326px] h-[326px] bg-white rounded-xl p-4"
      >
        <div className="flex flex-col items-center justify-center h-full">
          {showGif ? (
            <img
              src={`${diceGif}?v=${gifKey}`}
              key={gifKey}
              alt="Dice Rolling"
              className="w-40 h-40"
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p className="font-funnel-bold text-lg">You rolled</p>
              <p
                className="font-super-comic text-pip-blue-dark text-[140px]"
                style={{
                  textShadow: "0px 4px 0px #000",
                  WebkitTextStrokeWidth: "4px",
                  WebkitTextStrokeColor: "#FFF",
                }}
              >
                {roll}
              </p>
              {showConfetti && <ReactConfetti width={326} height={326} />}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
