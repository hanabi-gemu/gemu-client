import { tw } from "@/Utils/tailwindIntel";

export const Fonts = {
  Headings: {
    Title: {
      Bold: tw`text-[16px] font-medium leading-[120%] text-hight-contrast  font-sans`,
      Book: tw`text-[16px] font-[450] leading-[120%] text-hight-contrast  font-sans`,
    },
    Subtitle: {
      Book: tw`text-[16px] leading-[125%] tracking-[-0.28px] text-hight-contrast font-[450] font-sans`,
      Bold: tw`text-[16px] font-medium leading-[150%] tracking-[-0.28px] font-sans`,
    },
    Heading: {
      Medium: tw`text-[18px] font-medium leading-[120%] text-hight-contrast  font-sans -tracking-tight-custom`,
    },
  },
  Text: { Paragraph: { Medium: tw`text-[12px] font-medium leading-[125%]` } },
  Display: {
    Display3: {
      Light: tw`text-[24px] font-[450] leading-[48px] tracking-[-0.96px]`,
    },
  },
};
