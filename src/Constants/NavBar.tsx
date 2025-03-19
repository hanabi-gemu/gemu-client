import HomeLayout from "@/Pages/Home/HomeLayout";
import ReferralLayout from "@/Pages/Referral/ReferralLayout";
import Leaderboard from "@/Pages/Leaderboard/Leaderboard";
import Wallet from "@/Pages/Wallet";
import { ReactNode } from "react";
import LeaderboardSVG from "@/Pages/Main/LeaderboardSVG";
import ReferralSVG from "@/Pages/Main/ReferralSVG";
import HomeSVG from "@/Pages/Main/HomeSvg";
import WeeklyChallengeSVG from "@/Pages/Main/WeeklyChallengeSVG";

export type Route = {
  icon: ReactNode | null;
  label: string;
  route: string;
  element: ReactNode;
};

export const routes = [
  {
    icon: <HomeSVG />,
    label: "Home",
    route: "/",
    element: <HomeLayout />,
  },
  {
    icon: <LeaderboardSVG />,
    label: "Leaderboard",
    route: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    icon: <WeeklyChallengeSVG />,
    label: "Weekly Challenge",
    route: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
        />
      </svg>
    ),
    label: "Wallet",
    route: "/wallet",
    element: <Wallet />,
  },
  {
    icon: <ReferralSVG />,
    label: "Referral",
    route: "/referral",
    element: <ReferralLayout />,
  },
];
