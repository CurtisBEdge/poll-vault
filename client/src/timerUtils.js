
export const calculateTimeRemaining = (targetDate, now) => {
  const timeRemaining = targetDate - now;
  const seconds = Math.floor(timeRemaining / 1000) % 60;
  const minutes = Math.floor(timeRemaining / 1000 / 60) % 60;
  const hours = Math.floor(timeRemaining / 1000 / 60 / 60) % 24;
  const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);
  return {
    days,
    hours,
    minutes,
    seconds,
  };
};