function GoBackButton() {
  return (
    <button className="transition-colors duration-200 hover:opacity-80">
      <svg
        width="40"
        height="41"
        viewBox="0 0 40 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-200 hover:scale-105"
      >
        <g clipPath="url(#clip0_5630_5168)">
          <path
            d="M32.1881 0.0325928H7.81186C3.49749 0.0325928 0 3.53008 0 7.84445V32.2207C0 36.5351 3.49749 40.0326 7.81186 40.0326H32.1881C36.5025 40.0326 40 36.5351 40 32.2207V7.84445C40 3.53008 36.5025 0.0325928 32.1881 0.0325928Z"
            fill="#175CD3"
            className="transition-colors duration-200"
          />
          <path
            d="M32.1881 0.0325928H7.81186C3.49749 0.0325928 0 3.53008 0 7.84445V30.0612C0 34.3756 3.49749 37.8731 7.81186 37.8731H32.1881C36.5025 37.8731 40 34.3756 40 30.0612V7.84445C40 3.53008 36.5025 0.0325928 32.1881 0.0325928Z"
            fill="#0075FF"
            className="transition-colors duration-200"
          />
          <path
            style={{ mixBlendMode: "screen" }}
            d="M32.4255 1.72546H7.58293C4.33021 1.72546 1.69336 4.36231 1.69336 7.61504V29.8236C1.69336 33.0763 4.33021 35.7132 7.58293 35.7132H32.4255C35.6782 35.7132 38.315 33.0763 38.315 29.8236V7.61504C38.315 4.36231 35.6782 1.72546 32.4255 1.72546Z"
            fill="url(#paint0_linear_5630_5168)"
          />
          <path
            d="M12.7846 17.8974L24.7437 10.9935C26.3879 10.0446 28.4411 11.2307 28.4411 13.1285V26.9362C28.4411 28.834 26.3879 30.0201 24.7437 29.0712L12.7846 22.1673C11.1405 21.2185 11.1405 18.8463 12.7846 17.8974Z"
            fill="white"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_5630_5168"
            x1="20.0001"
            y1="2.33078"
            x2="20.0001"
            y2="37.2919"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#383838" />
            <stop offset="1" />
          </linearGradient>
          <clipPath id="clip0_5630_5168">
            <rect
              width="40"
              height="40"
              fill="white"
              transform="translate(0 0.0325928)"
            />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}

export default GoBackButton;
