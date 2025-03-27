import { Fonts } from "@/TwClassnames/Fonts";

const referralLevel = [1, 2, 3, 4, 5, 6, 7];
function ReferralMobile() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex mb-3">
          {referralLevel.map((level) => (
            <>
              <div className="flex items-center">
                <div className="rounded-full bg-shadow w-[34px] h-[34px] relative">
                  {level === 1 && (
                    <div className="absolute bottom-[15%] left-[15%]">
                      <CompletedIcon />
                    </div>
                  )}
                </div>
                {level !== 7 && (
                  <div className="bg-low-contrast h-[1px] w-[21px]"></div>
                )}
              </div>
            </>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <h1 className={Fonts.Text.Medium}>You’re at Level 1</h1>
          <h2 className={`${Fonts.Text.Book} text-low-contrast my-3`}>
            Refer 3 friend to get to level 2
          </h2>
        </div>
        <div className="flex flex-col">
          <div className="bg-light-box p-3 shadow-[0px_16px_48px_0px_rgba(113,113,113,0.20)] backdrop-blur-[12px] rounded-2xl">
            <p className={Fonts.Text.Paragraph.Bold}>Your referral link</p>
            <div className="bg-bg-bottom  p-4 w-full rounded-lg flex justify-between">
              <p className="font-">XM76T3R1</p>
              <div className="flex gap-2">
                <div className="bg-bg-bottom  p-1 flex justify-center items-center border border-contrast rounded-lg">
                  <CopyClipboardIcon />
                </div>
                <div className="bg-bg-bottom  p-1 flex justify-center items-center border border-contrast rounded-lg gap-2">
                  <p className={`${Fonts.Text.Paragraph.Small}`}>Share</p>
                  <ShareIcon />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-4">
            <h1 className={`${Fonts.Headings.Subtitle.Bold}`}>
              Invited Friends
            </h1>
            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <p className={`${Fonts.Text.Medium}`}>User</p>
                <p className={`${Fonts.Text.Book}`}>Jhon</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className={`${Fonts.Text.Medium}`}>Date</p>
                <p className={`${Fonts.Text.Book}`}>13/12/24</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className={`${Fonts.Text.Medium}`}>Points</p>
                <p className={`${Fonts.Text.Book}`}>100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReferralMobile;

function CopyClipboardIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M7.5 14.9998C7.04167 14.9998 6.64931 14.8366 6.32292 14.5103C5.99653 14.1839 5.83333 13.7915 5.83333 13.3332V3.33317C5.83333 2.87484 5.99653 2.48248 6.32292 2.15609C6.64931 1.8297 7.04167 1.6665 7.5 1.6665H15C15.4583 1.6665 15.8507 1.8297 16.1771 2.15609C16.5035 2.48248 16.6667 2.87484 16.6667 3.33317V13.3332C16.6667 13.7915 16.5035 14.1839 16.1771 14.5103C15.8507 14.8366 15.4583 14.9998 15 14.9998H7.5ZM7.5 13.3332H15V3.33317H7.5V13.3332ZM4.16667 18.3332C3.70833 18.3332 3.31597 18.17 2.98958 17.8436C2.66319 17.5172 2.5 17.1248 2.5 16.6665V4.99984H4.16667V16.6665H13.3333V18.3332H4.16667Z"
        fill="#3E3E3E"
      />
    </svg>
  );
}
function ShareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5.0026 19.1668C4.54427 19.1668 4.15191 19.0036 3.82552 18.6772C3.49913 18.3509 3.33594 17.9585 3.33594 17.5002V8.3335C3.33594 7.87516 3.49913 7.4828 3.82552 7.15641C4.15191 6.83002 4.54427 6.66683 5.0026 6.66683H7.5026V8.3335H5.0026V17.5002H15.0026V8.3335H12.5026V6.66683H15.0026C15.4609 6.66683 15.8533 6.83002 16.1797 7.15641C16.5061 7.4828 16.6693 7.87516 16.6693 8.3335V17.5002C16.6693 17.9585 16.5061 18.3509 16.1797 18.6772C15.8533 19.0036 15.4609 19.1668 15.0026 19.1668H5.0026ZM9.16927 13.3335V4.021L7.83594 5.35433L6.66927 4.16683L10.0026 0.833496L13.3359 4.16683L12.1693 5.35433L10.8359 4.021V13.3335H9.16927Z"
        fill="#3E3E3E"
      />
    </svg>
  );
}

function CompletedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M10 16.4L6 12.4L7.4 11L10 13.6L16.6 7L18 8.4L10 16.4Z"
        fill="#3E3E3E"
      />
    </svg>
  );
}
