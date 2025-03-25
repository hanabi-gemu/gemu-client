import { tw } from "@/Utils/tailwindIntel";

export const Fonts = {
  Headings: {
    Title: {
      Bold: tw`text-[16px] font-medium leading-[120%] text-high-contrast  font-circular`,
      Book: tw`text-[16px] font-[450] leading-[120%] text-high-contrast  font-circular`,
    },
    Subtitle: {
      Book: tw`text-[16px] leading-[125%] tracking-[-0.28px] text-high-contrast font-[450] font-circular`,
      Bold: tw`text-[16px] font-medium leading-[150%] tracking-[-0.28px] font-circular`,
    },
    Heading: {
      Medium: tw`text-[18px] font-medium leading-[120%] text-high-contrast font-circular -tracking-tight-custom`,
      Bold: tw`text-[18px] font-bold leading-[120%] text-high-contrast font-circular -tracking-tight-custom`,
    },
  },
  Text: {
    Paragraph: {
      Small: tw`text-[12px] font-medium leading-[150%] font-circular`,
      Medium: tw`text-[14px] font-medium leading-[125%] font-circular`,
      Bold: tw`text-[16px] font-medium leading-[30px] normal font-circular`,
    },
    Medium: tw`text-[14px] font-medium leading-[24px] normal font-circular`,
    Small: tw`text-[14px] font-medium leading-[150%] normal font-circular`,
    Book: tw`text-[14px] font-[450] leading-[24px] tracking-[0.32px] normal font-circular`,
  },
  Display: {
    Display3: {
      Light: tw`text-[24px] font-[450] leading-[48px] tracking-[-0.96px] font-circular`,
    },
  },
};
