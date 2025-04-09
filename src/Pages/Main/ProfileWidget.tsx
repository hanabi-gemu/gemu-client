import { Fonts } from "@/TwClassnames/Fonts";
import { truncateAddress } from "@/Utils/format";
import usePlayer from "@/Hooks/usePlayer";

function ProfileWidget() {
  const { player } = usePlayer();

  if (!player) return null;

  return (
    <div className="bg-shadow p-1 flex rounded-3xl items-center bg-pip-blue-base border-pip-blue-dark w-[163px] gap-2 h-[48px] border-[2px]">
      <div className="rounded-full bg-pip-white w-[36px] h-[36px]"></div>
      <div className="flex flex-col justify-centerF">
        <div className={`${Fonts.Text.Paragraph.Bold} text-pip-white`}>
          Chris
        </div>
        <div className={`${Fonts.Text.Book} text-pip-white opacity-80`}>
          {truncateAddress(player.id)}
        </div>
      </div>
    </div>
  );
}

export default ProfileWidget;
