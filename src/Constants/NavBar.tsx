import HomeLayout from "@/Pages/Home/HomeLayout";
import ReferralLayout from "@/Pages/Referral/ReferralLayout";
import { ReactNode } from "react";
import LeaderboardSVG from "@/Pages/Main/LeaderboardSVG";
import ReferralSVG from "@/Pages/Main/ReferralSVG";
import WeeklyChallengeSVG from "@/Pages/Main/WeeklyChallengeSVG";
import EarnSVG from "@/Pages/Main/EarnSVG";
import LeaderboardLayout from "@/Pages/Leaderboard/LeaderboardLayout";
import HomeSVG from "@/Pages/Main/HomeSVG";
import EarnLayout from "@/Pages/Earn/EarnLayout";

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
    element: <LeaderboardLayout />,
  },
  {
    icon: <WeeklyChallengeSVG />,
    label: "Weekly Challenge",
    route: "/leaderboard",
    element: <LeaderboardLayout />,
  },
  {
    icon: <EarnSVG />,
    label: "Earn",
    route: "/earn",
    element: <EarnLayout />,
  },
  {
    icon: <ReferralSVG />,
    label: "Referral",
    route: "/referral",
    element: <ReferralLayout />,
  },
];
