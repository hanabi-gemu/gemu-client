import useClaimReceipt from "@/Hooks/useClaimReceipt";
import { Events } from "@/TwClassnames/Events";
import { Fonts } from "@/TwClassnames/Fonts";

const ClaimQuestSlot = ({
  slot,
  receipt,
}: {
  slot: number;
  receipt: string;
}) => {
  const { claimReceipt } = useClaimReceipt(receipt, slot);

  return (
    <>
      <div className="border border-low-contrast w-[240px] h-[100px] backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center gap-y-2">
        <p className={Fonts.Headings.Title.Bold}>Quest Slot</p>
        <div
          onClick={claimReceipt}
          className={`rounded-2xl p-3 px-6 flex justify-center items-center w-[180px] bg-shadow hover:bg-shadow2 ${Events.Hover}`}
        >
          <p className={Fonts.Headings.Subtitle.Book}>Claim reward!</p>
        </div>
      </div>
    </>
  );
};

export default ClaimQuestSlot;
