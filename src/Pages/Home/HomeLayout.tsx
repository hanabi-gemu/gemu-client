import Player from "./Player";
import PlayerLevelWidget from "./PlayerLevelWidget";
import usePlayer from "@/Hooks/usePlayer";
import RegisterPlayer from "./Register";

const Layout = () => {
  const {
    player,
    // isLoading: isLoadingPlayer,
    // isRefetching: isRefetchingPlayer,
  } = usePlayer();

  return (
    <>
      <PlayerLevelWidget />
      {player ? <Player /> : <RegisterPlayer />}
    </>
  );
};
export default Layout;
