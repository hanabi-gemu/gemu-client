import { Fonts } from "@/TwClassnames/Fonts";

function EarnLayout() {
  return (
    <>
      <div className="bg-bg-bottom py-[61px] px-12 flex flex-col rounded-2xl gap-y-[39px] items-center relative mt-20">
        <div className="bg-bg-bottom px-[93px] py-[44px] flex justify-center rounded-2xl absolute top-[-9%]">
          <h1 className={`${Fonts.Headings.Title.Bold}`}>DAILY TASKS</h1>
        </div>

        <div className="p-7 flex gap-8 items-center bg-high rounded-2xl">
          <div className="bg-low-contrast rounded-2xl w-[76px] h-[70px]"></div>
          <div className="flex flex-col">
            <p className={`${Fonts.Text.Paragraph.Bold}`}>Daily Retweet</p>
            <div className="flex items-center gap-6">
              <p className={`${Fonts.Text.Paragraph.Medium}`}>Reward:</p>
              <div className="bg-low-contrast w-[48px] h-[48px] rounded-lg"></div>
              <div className="bg-low-contrast w-[48px] h-[48px] rounded-lg"></div>
            </div>
          </div>
        </div>

        <div className="p-7 flex gap-8 items-center bg-high rounded-2xl">
          <div className="bg-low-contrast rounded-2xl w-[76px] h-[70px]"></div>
          <div className="flex flex-col">
            <p className={`${Fonts.Text.Paragraph.Bold}`}>Daily Retweet</p>
            <div className="flex items-center gap-6">
              <p className={`${Fonts.Text.Paragraph.Medium}`}>Reward:</p>
              <div className="bg-low-contrast w-[48px] h-[48px] rounded-lg"></div>
              <div className="bg-low-contrast w-[48px] h-[48px] rounded-lg"></div>
            </div>
          </div>
        </div>

        <div className="p-7 flex gap-8 items-center bg-high rounded-2xl">
          <div className="bg-low-contrast rounded-2xl w-[76px] h-[70px]"></div>
          <div className="flex flex-col">
            <p className={`${Fonts.Text.Paragraph.Bold}`}>Daily Retweet</p>
            <div className="flex items-center gap-6">
              <p className={`${Fonts.Text.Paragraph.Medium}`}>Reward:</p>
              <div className="bg-low-contrast w-[48px] h-[48px] rounded-lg"></div>
              <div className="bg-low-contrast w-[48px] h-[48px] rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EarnLayout;
