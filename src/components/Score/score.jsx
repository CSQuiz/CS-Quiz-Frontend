import { useNavigate } from "react-router-dom";
import style from "./score.module.css";

const Score = () => {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <div className={style.title}>당신의 점수는</div>
      <div className={style.content}>
        <span className={style.score}>100 점</span>
        <button className={style.button} onClick={() => navigate("/lank")}>
          전체 순위 보러가기
        </button>
      </div>
    </div>
  );
};
export default Score;
