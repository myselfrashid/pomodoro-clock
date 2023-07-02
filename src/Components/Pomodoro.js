import React, { useState, useEffect } from "react";

function PomodoroClock() {
  const [workTime, setWorkTime] = useState(25 * 60); // 25 minutes in seconds
  const [breakTime, setBreakTime] = useState(5 * 60); // 5 minutes in seconds
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [cycles, setCycles] = useState(0);
  const [limit, setLimit] = useState(2); // Number of cycles as the limit
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (cycles >= limit) {
      stopTimer();
    }
  }, [cycles, limit]);

  const startTimer = () => {
    if (!timer) {
      const countdown = setInterval(() => {
        if (isWorkTime) {
          if (workTime > 0) {
            setWorkTime((prevTime) => prevTime - 1);
          } else {
            setIsWorkTime(false);
            setBreakTime(5 * 60);
          }
        } else {
          if (breakTime > 0) {
            setBreakTime((prevTime) => prevTime - 1);
          } else {
            setIsWorkTime(true);
            setWorkTime(25 * 60);
            setCycles((prevCycles) => prevCycles + 1);
          }
        }
      }, 1000);

      setTimer(countdown);
    }
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimer(null);
  };

  const resetTimer = () => {
    stopTimer();
    setWorkTime(25 * 60);
    setBreakTime(5 * 60);
    setIsWorkTime(true);
    setCycles(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col bg-[#71b48d] md:w-[50%] lg:h-[50%] md:h-[60%] xs:w-[90%] items-center justify-center lg:p-4 md:p-4 xs:p-6 gap-2">
      <h1 className="bg-[#86cb92] w-full md:w-[100%] xs:w-[100%] text-center uppercase font-Nunito md:text-4xl xs:text-3xl font-bold md:shadow-lg xs:shadow-sm lg:m-6 md:m-2 xs:m-0">Pomodoro Clock</h1>
      <div className="flex flex-col gap-2">
        <p className="w-full text-center uppercase font-Nunito font-bold text-2xl">{isWorkTime ? "Work Session" : "Break Time"}</p>
        <p className="text-center font-mono bg-[#251f47]/[0.5] px-4 py-2 rounded-lg text-2xl">{isWorkTime ? formatTime(workTime) : formatTime(breakTime)}</p>
      </div>
      <div className="flex flew-col gap-4">
        {timer ? (
          <button className="px-4 py-2 bg-[#251f47] rounded-md" onClick={stopTimer}>Stop</button>
        ) : (
          <button className="px-4 py-2 bg-[#251f47] rounded-md" onClick={startTimer}>Start</button>
        )}
        <button  className="px-4 py-2 bg-[#251f47] rounded-md" onClick={resetTimer}>Reset</button>
      </div>
      <p className="font-Nunito text-lg">
        Cycles: {cycles}/{limit}
      </p>
    </div>
  );
}

export default PomodoroClock;
