function StatBox({ stat, value }: { stat: string; value: number }) {
  return (
    <div className="flex flex-col items-center w-[75px]">
      <div className="w-[35px] h-[35px] relative my-3">
        <p className="title-book absolute left-[14px] top-[10px]">{value}</p>
        <div className="border border-black absolute w-[35px] h-[35px] top-0 rotate-45"></div>
      </div>
      <p className="subtitle-bold">{stat}</p>
    </div>
  );
}

export default StatBox;
