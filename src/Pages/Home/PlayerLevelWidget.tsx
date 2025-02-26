function PlayerLevelWidget() {
  return (
    <div className="bg-shadow p-6 flex rounded-3xl items-center gap-[30px]">
      <div className="bg-[rgba(111,_111,_111,_1)] rounded-full w-[72px] h-[72px]"></div>
      <div className="flex flex-col">
        <div className="font-bold">Player Name</div>
        <div className="subtitle-book">Level 1</div>
      </div>
    </div>
  );
}

export default PlayerLevelWidget;
