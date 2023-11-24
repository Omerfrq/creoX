import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialTime: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialTime }) => {
  const [time, setTime] = useState<number>(initialTime);
  const [timerActive, setTimerActive] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerActive) {
      interval = setInterval(() => {
        if (time > 0) {
          setTime((prevTime) => prevTime - 1);
        } else {
          clearInterval(interval);
          setTimerActive(false);
        }
      }, 1000);
    }

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [time, timerActive]);

  const handleResendClick = () => {
    // Reset timer and make it active again
    setTime(initialTime);
    setTimerActive(true);
  };

  return (
    <div>
      {!timerActive ? (
        <button
          className='underline'
          onClick={() => {
            if (!timerActive) {
              handleResendClick();
            }
          }}
        >
          {`I haven't received the code`}
        </button>
      ) : (
        <div>
          {`I haven't received the code`} &middot; {time} sec
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
