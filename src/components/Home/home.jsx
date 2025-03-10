import { useState } from "react";
import style from "./home.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SERVER = import.meta.env.VITE_SERVER;

const Home = () => {
  const [nickName, setNickName] = useState("");
  const [difficulty, setDifficulty] = useState(null);
  const navigate = useNavigate();

  const difficultyList = ["Easy", "Normal", "Hard", "Random"];

  const requestGameStart = async () => {
    try {
      const response = await axios.post(`${SERVER}/api/game/start`, {
        nickname: nickName,
        difficulty: difficulty,
      });
      localStorage.setItem("gameId", response.data.gameId);
      return response.data.gameQuestionList;
    } catch (e) {
      // 닉네임 중복 처리
      if (e.response.status === 400) {
        alert("이미 사용중인 닉네임 입니다.");
      }
      console.error(e);
      return null;
    }
  };

  const gameStart = async (event) => {
    event.preventDefault();
    if (nickName.trim() && difficulty) {
      const gameQuestions = await requestGameStart(); // API 응답을 기다린 후 데이터 저장
      if (gameQuestions) {
        navigate("/quiz", { state: gameQuestions });
      }
    } else {
      alert("닉네임과 난이도를 설정해주세요.");
    }
  };

  const selectDifficulty = (level) => {
    setDifficulty(level);
  };

  return (
    <>
      <form className={style.container} onSubmit={gameStart}>
        <div className={style.title}>사용할 닉네임을 입력해주세요.</div>
        <div className={style.contents}>
          <input
            className={style.name}
            type="text"
            value={nickName}
            onChange={(e) => {
              setNickName(e.target.value);
              setDifficulty(null);
            }}
            placeholder="ex) 컴붕이"
            required
          />
          <div className={style.difficulty}>
            {difficultyList.map((level) => (
              <button
                key={level}
                value={level}
                className={style.level}
                type="button"
                onClick={() => selectDifficulty(level)}
              >
                {level}
              </button>
            ))}
          </div>
          <button className={style.submit} type="submit">
            start
          </button>
        </div>
      </form>
    </>
  );
};

export default Home;
