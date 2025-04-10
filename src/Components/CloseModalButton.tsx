function CloseModalButton() {
  return (
    <svg
      className="group hover:cursor-pointer" // Make the SVG a group to use group-hover
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_5536_30880)">
        <path
          className="fill-[#4F0409]"
          d="M32.1881 0H7.81186C3.49749 0 0 3.49749 0 7.81186V32.1881C0 36.5025 3.49749 40 7.81186 40H32.1881C36.5025 40 40 36.5025 40 32.1881V7.81186C40 3.49749 36.5025 0 32.1881 0Z"
        />
        <path
          // Use Tailwind's transition and group-hover to change fill color
          className="fill-[#FF3542] transition-colors duration-300 ease-in-out group-hover:fill-[#FF6A75]"
          d="M32.1881 0H7.81186C3.49749 0 0 3.49749 0 7.81186V30.0286C0 34.343 3.49749 37.8405 7.81186 37.8405H32.1881C36.5025 37.8405 40 34.343 40 30.0286V7.81186C40 3.49749 36.5025 0 32.1881 0Z"
        />
        <path
          style={{ mixBlendMode: "screen" }}
          d="M32.425 1.69336H7.58244C4.32972 1.69336 1.69287 4.33021 1.69287 7.58293V29.7915C1.69287 33.0442 4.32972 35.6811 7.58244 35.6811H32.425C35.6777 35.6811 38.3145 33.0442 38.3145 29.7915V7.58293C38.3145 4.33021 35.6777 1.69336 32.425 1.69336Z"
          fill="url(#paint0_linear_5536_30880)"
        />
        <path
          d="M28.1149 25.7299L14.2735 11.8885C13.7081 11.3231 12.7914 11.3231 12.226 11.8885L11.8905 12.224C11.3251 12.7894 11.3251 13.7062 11.8905 14.2716L25.7319 28.1129C26.2973 28.6784 27.214 28.6784 27.7794 28.1129L28.1149 27.7775C28.6803 27.212 28.6803 26.2953 28.1149 25.7299Z"
          fill="white"
        />
        <path
          d="M14.2696 28.1151L28.111 14.2738C28.6764 13.7084 28.6764 12.7916 28.111 12.2262L27.7755 11.8907C27.2101 11.3253 26.2933 11.3253 25.7279 11.8907L11.8866 25.7321C11.3211 26.2975 11.3211 27.2142 11.8866 27.7797L12.222 28.1151C12.7875 28.6806 13.7042 28.6806 14.2696 28.1151Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_5536_30880"
          x1="19.9996"
          y1="2.29868"
          x2="19.9996"
          y2="37.2598"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#383838" />
          <stop offset="1" />
        </linearGradient>
        <clipPath id="clip0_5536_30880">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default CloseModalButton;
