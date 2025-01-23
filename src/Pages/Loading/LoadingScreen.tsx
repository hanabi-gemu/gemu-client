import { useState, useEffect } from "react";

const LoadingScreen = ({ duration = 4000 }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration + 300);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null; // Removes the loading screen after the fade-out

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-slate-800 z-50 ${
          fadeOut && "animate-fade-out"
        }`}
      >
        <div className="animate-scale-up">
          <img src="/loading/loading.gif" alt="Logo" className="w-36 h-auto" />
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
