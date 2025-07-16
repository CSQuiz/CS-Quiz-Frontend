import { Link } from "react-router-dom";
import style from "./score.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const SERVER = import.meta.env.VITE_SERVER;

const Score = () => {
  const [score, setScore] = useState(0);
  const [nickName, setNickName] = useState("");

  useEffect(() => {
    requestScore();
  }, []);

  const gameId = sessionStorage.getItem("gameId");
  const requestScore = async () => {
    try {
      const response = await axios.post(`${SERVER}/api/game/${gameId}/end`, {
        gameId: gameId,
      });
      setScore(response.data.finalScore);
      setNickName(response.data.nickname);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.title}>{nickName}의 점수는</div>
      <div className={style.content}>
        <span className={style.score}>{score} 점</span>
        <div className={style.routeSelector}>
          <Link to="/rank">전체 순위 보러가기</Link>
          <div className={style.vertical_line}></div>
          <Link to="/">게임 다시하기</Link>
        </div>
      </div>
    </div>
  );
};
export default Score;
