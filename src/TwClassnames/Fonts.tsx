const tw = (strings: TemplateStringsArray): string => strings[0];

export const Fonts = {
  Headings: {
    Title: {
      Bold: tw`text-[16px] font-medium leading-[120%] text-[#1D1D1D] font-sans`,
      Book: tw`text-[16px] font-[450] leading-[120%] text-[#1D1D1D] font-sans`,
    },
  },
};
