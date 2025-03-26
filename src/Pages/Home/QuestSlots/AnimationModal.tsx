import { useState, useEffect } from "react";
import Spinner from "@/Components/Spinner";
import { Fonts } from "@/TwClassnames/Fonts";
import { Quest } from "@/Constants/Quests";

function AnimationModal({ questItem }: { questItem?: Quest }) {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 5000);

    // Cleanup the timer if the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col p-12 gap-y-12 items-center">
      {showSpinner ? (
        <>
          <div className={`${Fonts.Headings.Subtitle.Bold}`}>
            Opening chest...
          </div>
          <Spinner />
        </>
      ) : (
        <>
          <div className={`${Fonts.Headings.Subtitle.Bold}`}>
            Congratulations!
          </div>
          <div className={`${Fonts.Text.Paragraph.Medium}`}>
            this is your reward
            {questItem &&
              Object.entries(questItem?.rewards.fields).map(([key, value]) => (
                <div
                  className={`${Fonts.Text.Paragraph.Medium} text-med-contrast mt-2`}
                >
                  {key}: {value}
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AnimationModal;
