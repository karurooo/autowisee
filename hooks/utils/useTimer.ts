import { useState, useEffect } from 'react';

export const useTimer = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false); // Stop the timer when it reaches 0
    }

    // Cleanup the interval when the component unmounts or dependencies change
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(initialTime); // Reset the timer to the initial value
    setIsActive(true); // Start the timer
  };

  const resetTimer = () => {
    setTimeLeft(initialTime); // Reset the timer to the initial value
    setIsActive(false); // Stop the timer
  };

  return { timeLeft, isActive, startTimer, resetTimer };
};
