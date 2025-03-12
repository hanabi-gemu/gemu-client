import Player from "./Player";
import usePlayer from "@/Hooks/usePlayer";
import RegisterPlayer from "./Register";
import QuestSlots from "./QuestSlots/QuestSlots";

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
