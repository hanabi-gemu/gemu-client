import { Fonts } from "@/TwClassnames/Fonts";
import { truncateAddress } from "@/Utils/format";
import avatarImage from "./bearSmall.png";

function LeaderboardMobile() {
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["players"],
  //   queryFn: fetchPlayers,
  // });
  const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  return (
    <>
      <div className="flex flex-col max-h-[75vh]">
        <div className="">
          <div className="flex flex-col">
            <div className="mx-auto">
              <img
                src={avatarImage}
                width={68}
                height={78}
                className="object-cover rotate-[28deg]"
              />
              <div className="flex gap-2 mt-3">
                <div className="rounded-full bg-shadow w-[35px] h-[35px] text-center flex items-center justify-center">
                  <p className={Fonts.Display.Display3.Light}>1</p>
                </div>
                <div className="flex flex-col gap-y-1">
                  <p className={Fonts.Text.Paragraph.Medium}>
                    {truncateAddress(
                      "0x3facd6eb8fe07a293c9315485ec1c77c38d7d28112cfec394b9b23da0599ce52"
                    )}
                  </p>
                  <p
                    className={`${Fonts.Text.Paragraph.Medium} text-low-contrast`}
                  >
                    1000 XP
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <img
                src={avatarImage}
                width={68}
                height={78}
                className="object-cover rotate-[-13deg]"
              />
              <div className="flex gap-2 mt-3">
                <div className="rounded-full bg-shadow w-[35px] h-[35px] text-center flex items-center justify-center">
                  <p className={Fonts.Display.Display3.Light}>1</p>
                </div>
                <div className="flex flex-col gap-y-1">
                  <p className={Fonts.Text.Paragraph.Medium}>
                    {truncateAddress(
                      "0x3facd6eb8fe07a293c9315485ec1c77c38d7d28112cfec394b9b23da0599ce52"
                    )}
                  </p>
                  <p
                    className={`${Fonts.Text.Paragraph.Medium} text-low-contrast`}
                  >
                    1000 XP
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="h-[130px]">
                <div className="absolute right-[15%] top-[-20%]">
                  <img
                    src={avatarImage}
                    width={68}
                    height={78}
                    className=" object-cover  rotate-[28deg]"
                  />
                  <div className="flex gap-2 mt-3">
                    <div className="rounded-full bg-shadow w-[35px] h-[35px] text-center flex items-center justify-center">
                      <p className={Fonts.Display.Display3.Light}>1</p>
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <p className={Fonts.Text.Paragraph.Medium}>
                        {truncateAddress(
                          "0x3facd6eb8fe07a293c9315485ec1c77c38d7d28112cfec394b9b23da0599ce52"
                        )}
                      </p>
                      <p
                        className={`${Fonts.Text.Paragraph.Medium} text-low-contrast`}
                      >
                        1000 XP
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className={Fonts.Headings.Subtitle.Book}>Players Leaderboard</h1>
          <div className="overflow-y-scroll max-h-full pr-10">
            {data?.map((_, index) => (
              <div
                className="flex p-3 mb-3 rounded-md justify-between items-center"
                key={index}
              >
                <div className={Fonts.Text.Paragraph.Medium}> 1</div>
                <div className="rounded-full w-[34px] h-[34px] bg-low-contrast"></div>
                <div className={Fonts.Text.Paragraph.Medium}>
                  {truncateAddress(
                    "0x3facd6eb8fe07a293c9315485ec1c77c38d7d28112cfec394b9b23da0599ce52"
                  )}
                </div>
                <div>
                  <p
                    className={`${Fonts.Text.Paragraph.Medium} text-low-contrast`}
                  >
                    {100} XP
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LeaderboardMobile;
