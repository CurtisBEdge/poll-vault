import React, { useState, useEffect } from 'react';
import { Typography } from "@mui/material";
import { calculateTimeRemaining } from "./timerUtils";
const CountdownTimer = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(() => calculateTimeRemaining(targetDate, Date.now()));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate, Date.now()));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate, setTimeRemaining]);

  const days = String(timeRemaining.days).padStart(2, '0');
  const hours = String(timeRemaining.hours).padStart(2, '0');
  const minutes = String(timeRemaining.minutes).padStart(2, '0');
  const seconds = String(timeRemaining.seconds).padStart(2, '0');

  if (targetDate - Date.now() > 0) {
    return (
      <Typography>
        <span>This poll will expire in </span>
        <span>{days}</span>
        <span>:</span>
        <span>{hours}</span>
        <span>:</span>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </Typography>
    )
  }
  return (
    <Typography>This poll has expired</Typography>
  )
};


export default CountdownTimer;