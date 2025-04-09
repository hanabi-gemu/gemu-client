import QuestSlot from "./QuestSlot";

function QuestSlots() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center gap-2">
        <LeftCircles />
        <h1 className="">Take a quest</h1>
        <RightCircles />
      </div>
      <div className="flex justify-between gap-3 mt-2">
        <QuestSlot slot={1} />
        <QuestSlot slot={2} />
        <QuestSlot slot={3} />
      </div>
    </div>
  );
}

export default QuestSlots;

function LeftCircles() {
  return (
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.05" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.1" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.3" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.4" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.5" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.6" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.7" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.8" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.9" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
    </div>
  );
}

function RightCircles() {
  return (
    <div className="flex items-center justify-between gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.9" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.8" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.7" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.6" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.5" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.4" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.3" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.2" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.1" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
      >
        <circle opacity="0.05" cx="2.5" cy="2.5" r="2.5" fill="white" />
      </svg>
    </div>
  );
}
