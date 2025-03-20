import useWindowWidth from "@/Hooks/useWindowWidth";
import Referral from "./Referral";
import ReferralMobile from "./ReferralMobile";

function ReferralLayout() {
  const isMobile = useWindowWidth();
  return <>{isMobile ? <ReferralMobile /> : <Referral />}</>;
}

export default ReferralLayout;
