import './App.css';
import { useState, useRef } from 'react'
const padTime = (time) => {
  return time.toString().padStart(2, "0");
}
const App = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [title, setTitle] = useState("Pomodoro Time");
  const intervalRef = useRef(null);
  const startTimer = () => {
    if (intervalRef.current !== null) return;
    setTitle("Timer is Running");
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft > 0) return timeLeft - 1;
        resetTimer();
        return 0.
      });
    }, 1000);
  };
  const stopTimer = () => {
    if (intervalRef.current === null) return;
    setTitle("Keep it going");
    setIsRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
  const resetTimer = () => {
    setTitle("Start Next Round");
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    setTimeLeft(25 * 60);
  }
  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime((timeLeft - minutes * 60));
  return (
    <div className="app">
      <h2>{title}</h2>
      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className="buttons">
        {!isRunning && <button onClick={startTimer}> Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default App;
