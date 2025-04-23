import Player from "./Player";
import PlayerMobile from "./PlayerMobile";
import QuestSlots from "./QuestSlots/QuestSlots";
import QuestSlotsMobile from "./QuestSlots/QuestSlotsMobile";
import useWindowWidth from "@/Hooks/useWindowWidth";

const Layout = () => {
  const isMobile = useWindowWidth();

  return (
    <>
      {isMobile ? <PlayerMobile /> : <Player />}
      {isMobile ? <QuestSlotsMobile /> : <QuestSlots />}
    </>
  );
};

export default Layout;
