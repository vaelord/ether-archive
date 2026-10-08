import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-10-31T20:00:00+03:00").getTime();

function getTimeLeft() {
  const difference = TARGET_DATE - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div className="countdown-unit" key={label}>
          <div className="countdown-number">{String(value).padStart(2, "0")}</div>
          <div className="countdown-label">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default Countdown;