import useWindowWidth from "@/Hooks/useWindowWidth";
import Leaderboard from "./Leaderboard";
import LeaderboardMobile from "./LeaderboardMobile";

function LeaderboardLayout() {
  const isMobile = useWindowWidth();

  return <>{isMobile ? <LeaderboardMobile /> : <Leaderboard />}</>;
}

export default LeaderboardLayout;
