import { useState } from "react";
import style from "./home.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [nickName, setNickName] = useState("");
  const [difficulty, setDifficulty] = useState(null);

  const difficultyList = ["Easy", "Normal", "Hard", "Random"];

  const navigate = useNavigate();

  const requestGameStart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/game/start",
        {
          nickname: nickName,
          difficulty: difficulty,
        }
      );
      localStorage.setItem("gameId", response.gameId);
      console.log(response.gameId);
      return true;
    } catch (e) {
      // 닉네임 중복 처리
      if (e.response.status === 400) {
        alert(e.response.message);
      }
      console.error(e);
      return null;
    }
  };

  const gameStart = (event) => {
    event.preventDefault();
    if (nickName.trim() && difficulty) {
      const result = requestGameStart();
      if (result !== null) {
        navigate("/quiz");
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
