import { Pause, Play, Clock, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 59) {
            setMinutes((m) => m + 1);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (mins: number, secs: number) =>
    `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 w-fit">
  <div className="flex items-center space-x-4">
    <button
      onClick={() => setIsRunning(!isRunning)}
      className={`p-1 rounded-md border text-sm transition-colors ${
        isRunning
          ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200"
          : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200"
      }`}
    >
      {isRunning ? <Pause size={16} /> : <Play size={16} />}
    </button>

    <div className="flex items-center space-x-2">
      <Clock
        className={`w-4 h-4 ${
          isRunning ? "text-green-500 animate-pulse" : "text-gray-500"
        }`}
      />
      <span className="font-mono text-lg text-gray-800 dark:text-gray-200">
        {formatTime(minutes, seconds)}
      </span>
    </div>

    <button
      onClick={resetTimer}
      className="p-1 rounded-md border text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <RotateCcw size={16} />
    </button>
  </div>
</div>
  );
};

export default Timer;