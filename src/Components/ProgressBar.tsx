type ProgressBarCountProps = {
  currentTimeStamp: number;
  lastActionTimeStamp: number;
  period: number;
};

function ProgressBar({
  currentTimeStamp,
  lastActionTimeStamp,
  period,
}: ProgressBarCountProps) {
  const elapsedTime = Math.max(currentTimeStamp - lastActionTimeStamp, 0);
  const progressPercentage = Math.min((elapsedTime / period) * 100, 100);

  const elapsedSeconds = Math.floor(elapsedTime / 1000);
  const timeToReach = Math.floor(period / 1000);

  return (
    <div className="h-20 w-full p-5 bg-white-3 rounded-[1000px]">
      <div className="flex font-body text-grey-lightest items-center">
        <p className="text-lg">
          {elapsedSeconds > timeToReach ? "Full" : elapsedSeconds + "s"}
        </p>
        <p className="text-xs pt-1">
          {elapsedSeconds > timeToReach ? "" : "/" + timeToReach + "s"}
        </p>
        <p className="text-lg ml-1">Energy</p>
      </div>
      <div className="flex mt-1 w-full h-[6px] bg-sky-700 rounded-3xl">
        <div
          className="bg-sky-950 h-[6px] rounded-3xl transition-all ease-in-out delay-400"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
