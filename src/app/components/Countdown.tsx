'use client';
import { useEffect, useState } from "react";

export default function Countdown({ date }: { date: string }) {
  const [timeLeft, setTimeLeft] = useState("");
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const eventTime = new Date(date).getTime();
      const distance = eventTime - now;

      if (distance <= 0 && Date.now() < eventTime + ONE_DAY_MS) {
  setTimeLeft("Happening Now!"); // first 24 hours after start
 } else if (Date.now() >= eventTime + ONE_DAY_MS) {
  setTimeLeft("Event Ended");
  clearInterval(interval);
 } else {
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
 }
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
  <p style={{ color: timeLeft === "Event Started!" ? "green" : "inherit" }}>
    {timeLeft}
  </p>
);
}