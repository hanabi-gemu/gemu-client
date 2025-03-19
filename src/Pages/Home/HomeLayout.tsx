import Player from "./Player";
import PlayerMobile from "./PlayerMobile";
import usePlayer from "@/Hooks/usePlayer";
import RegisterPlayer from "./Register";
import QuestSlots from "./QuestSlots/QuestSlots";
import QuestSlotsMobile from "./QuestSlots/QuestSlotsMobile";
import useWindowWidth from "@/Hooks/useWindowWidth";

const Layout = () => {
  const { player } = usePlayer();
  const isMobile = useWindowWidth();

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
