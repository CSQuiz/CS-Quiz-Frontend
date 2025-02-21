import { useState } from "react";
import style from "./home.module.css";

const Home = () => {
  const [nickName, setNickName] = useState("");
  const [difficulty, setDifficulty] = useState(null);

  const difficultyList = ["Easy", "Normal", "Hard", "Random"];

  const gameStart = (event) => {
    event.preventDefault();
    if (nickName.trim() && difficulty) {
      alert("게임 시작");
    } else {
      alert("모든 필드 선택");
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
