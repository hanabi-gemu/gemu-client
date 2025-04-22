import useClaimReceipt from "@/Hooks/useClaimReceipt";
import chestIcon from "./chest.png";
import { Events } from "@/TwClassnames/Events";
import { Fonts } from "@/TwClassnames/Fonts";

const ClaimQuestSlot = ({
  slot,
  receiptId,
}: {
  slot: number;
  receiptId: string;
}) => {
  const { claimReceipt } = useClaimReceipt(receiptId, slot);

  return (
    <>
      <div
        className="w-[152px] h-[172px]
			border-[4px] border-pip-gray-200 bg-pip-white p-4
			backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center"
      >
        <img src={chestIcon} width={40} height={42} className="mb-2" />

        <div
          onClick={claimReceipt}
          className={`bg-pip-yellow-base mt-2 rounded-lg py-[5px] text-center hover:bg-[#E6E6E6] ${Events.Hover} transition-all duration-300 ease-in-out
					w-[104px]	h-[30px] border-pip-yellow-dark border-[2px] relative flex items-center justify-center`}
        >
          <p className={`${Fonts.pip.body.small} text-pip-yellow-dark`}>
            Claim Reward
          </p>
        </div>
      </div>
    </>
  );
};

export default ClaimQuestSlot;
