import RegisterPlayer from '@/Components/RegisterPlayer';
import Spinner from '@/Components/Spinner';
import { playerStruct } from '@/smartContractInterface';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { MoveStruct, PaginatedObjectsResponse, SuiParsedData } from '@mysten/sui/client';
import { useQuery } from '@tanstack/react-query';

type MoveObject = Extract<SuiParsedData, { dataType: 'moveObject' }>

function isMoveObject(data: SuiParsedData | null | undefined): data is MoveObject {
  return data?.dataType === 'moveObject';
}

type PlayerState = {
  level: number;
};

const invalidPlayerState: PlayerState = {
  level: -1
};

function isPlayerState(obj: unknown): obj is PlayerState {
  return typeof obj === 'object' && obj !== null && 'level' in obj;
}

function createPlayerStateFromResponse(response: PaginatedObjectsResponse): PlayerState {
  let playerState = invalidPlayerState;
  if (response.data.length !== 0 && isMoveObject(response.data[0].data?.content)) {
    playerState = createPlayerStateFromData(response.data[0].data.content.fields);
  }
  return playerState;
}

function createPlayerStateFromData(value: MoveStruct): PlayerState {
  if (isPlayerState(value)) {
    return { level: value.level as number };
  }
  if (!Array.isArray(value) && value.fields && isPlayerState(value.fields)) {
    return { level: value.fields.level as number };
  }
  return invalidPlayerState;
}

function isValidPlayerState(player: PlayerState): boolean {
  return player.level !== -1;
}

function Player() {
  const client = useSuiClient();
  const account = useCurrentAccount()!;

  const { data: player, isLoading } = useQuery({
    queryKey: ['player', account.address],
    queryFn: async () => {
      const resp = await client.getOwnedObjects({
        owner: account.address,
        filter: {
          MatchAll: [{ StructType: playerStruct }]
        },
        options: {
          showContent: true
        }
      });
      return createPlayerStateFromResponse(resp);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {player && isValidPlayerState(player) ? (
        <div>
          <strong>Player level:</strong> {player.level}
        </div>
      ) : (
        <RegisterPlayer />
      )}
    </>
  );
}

export default Player;
