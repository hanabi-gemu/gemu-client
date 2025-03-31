import Player from "./Player";
import PlayerMobile from "./PlayerMobile";
import usePlayer from "@/Hooks/usePlayer";
import QuestSlots from "./QuestSlots/QuestSlots";
import QuestSlotsMobile from "./QuestSlots/QuestSlotsMobile";
import useWindowWidth from "@/Hooks/useWindowWidth";
import RegisterPlayer from "./Register";

const Layout = () => {
  const { player } = usePlayer();
  const isMobile = useWindowWidth();

  console.log(player);

  return (
    <>
      {player ? (
        <>
          {isMobile ? <PlayerMobile /> : <Player />}
          {isMobile ? <QuestSlotsMobile /> : <QuestSlots />}
        </>
      ) : (
        <RegisterPlayer />
      )}
    </>
  );
};

export default Layout;
