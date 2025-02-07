import { fetchPlayers } from "@/Actions/Player";
import Spinner from "@/Components/Spinner";
import { truncateAddress } from "@/Utils/format";
import { useQuery } from "@tanstack/react-query";

function Leaderboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["players"],
    queryFn: fetchPlayers,
  });

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-4">LEADERBOARD</h1>
      {isError && <h1 className="text-red-600">ERROR FETCHING DATA</h1>}
      {isLoading ? (
        <Spinner />
      ) : (
        data?.map(({ level, player_id, xp }) => (
          <div className="flex flex-col border p-3 mb-3 rounded-md">
            <div className="flex gap-4">
              <div className="font-bold">id</div>
              <div>{truncateAddress(player_id)}</div>
            </div>
            <div className="flex gap-4">
              <div className="font-bold">level</div>
              <div>{level}</div>
            </div>
            <div className="flex mb-5 gap-4">
              <div className="font-bold">xp</div>
              <div>{xp}</div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default Leaderboard;
