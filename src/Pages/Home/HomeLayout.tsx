import Player from "./Player";
import PlayerLevelWidget from "./PlayerLevelWidget";
import usePlayer from "@/Hooks/usePlayer";
import RegisterPlayer from "./Register";
import QuestSlots from "./QuestSlots";

const Layout = () => {
  const {
    player,
    // isLoading: isLoadingPlayer,
    // isRefetching: isRefetchingPlayer,
  } = usePlayer();

  return (
    <>
      {player ? (
        <>
          <PlayerLevelWidget />
          <Player />
          <QuestSlots />
        </>
      ) : (
        <RegisterPlayer />
      )}
    </>
  );
};
export default Layout;
