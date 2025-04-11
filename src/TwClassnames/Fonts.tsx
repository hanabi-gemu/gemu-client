import { tw } from "@/Utils/tailwindIntel";

export const Fonts = {
  pip: {
    super_cartoon: {
      h2: tw`font-super-comic text-[34px] font-normal leading-[34px] tracking-[-1px]`,
      h4: tw`font-super-comic text-[20px] font-normal leading-[21px] tracking-[-0.5px]`,
    },
    body: {
      small: tw`font-bold text-[14px] leading-[20px]`,
    },
    h3: {
      bold: tw`font-funnel-bold text-[20px] not-italic leading-[24px] tracking-[-0.2px]`,
    },
    caption: {
      medium: tw`font-funnel-medium text-[12px] font-medium leading-[16px] not-italic`,
    },
  },
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
