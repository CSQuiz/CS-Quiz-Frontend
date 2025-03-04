import { useEffect, useState } from "react";
import style from "./progressBar.module.css";

const ProgressBar = ({ duration, onTimeUp, resetTime, answerMode }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration); // 새로운 문제마다 타이머 리셋

    if (answerMode) {
      setTimeLeft(0);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0.1) {
          clearInterval(timer);
          setTimeout(() => onTimeUp(), 0); // 시간이 다 되면 다음 문제로 이동
          return 0;
        }
        return prevTime - 0.1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [resetTime, answerMode]);

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <div>
      <div className={style.timeContainer}>
        <span className={style.leftTime}>
          {Math.floor(timeLeft / 60)}:
          {Math.floor(timeLeft % 60)
            .toString()
            .padStart(2, "0")}
        </span>
      </div>
      <div className={style.progressContainer}>
        <div className={style.progressBar} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
