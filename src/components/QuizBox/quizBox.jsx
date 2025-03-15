import { useState, useEffect } from "react";
import style from "./quizBox.module.css";
import Option from "../Option/option";
import ProgressBar from "../ProgressBar/progressBar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SERVER = import.meta.env.VITE_SERVER;

const QuizBox = () => {
  const [questions, setQuestions] = useState([]); // 질문 리스트
  const [curQNum, setCurQNum] = useState(0); // 현재 질문 번호
  const [resetTime, setResetTime] = useState(0); // 타이머 리셋용 키
  const [answerMode, setAnswerMode] = useState(false);
  const [clickedOption, setClickedOption] = useState(""); // 사용자가 선택한 옵션 확인
  const navigate = useNavigate();

  const location = useLocation();
  const gameQuestions = location.state;

  const gameId = localStorage.getItem("gameId");

  useEffect(() => {
    if (gameQuestions.length > 0) {
      setQuestions(gameQuestions);
    }
  }, []);

  const nextQuestion = () => {
    if (curQNum < questions.length - 1) {
      setCurQNum(curQNum + 1); // 다음 문제로 이동
      setAnswerMode(false); // 문제 풀기 모드로 되돌아감
      setResetTime((prev) => prev + 1); // 타이머 리셋
      setClickedOption(""); // 클릭 상태 초기화
    } else {
      navigate("/score", { replace: true }); // 마지막 문제일 경우 결과 페이지 이동
    }
  };

  const clickOption = (option) => {
    if (!answerMode) {
      setAnswerMode(true); // 사용자가 옵션을 클릭하면 답 출력 모드로 변경
      setClickedOption(option);
      requestAnswer(option);
    }
  };

  const timeUp = () => {
    if (!answerMode) {
      setAnswerMode(true);
    }
  };

  // 서버에서 채점하기 위한 요청
  const requestAnswer = async (option) => {
    try {
      const response = await axios.post(`${SERVER}/api/game/${gameId}/answer`, {
        questionId: questions[curQNum]?.id,
        answer: option,
      });
      console.log("정답 여부: ", response.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.timeBar}>
        <ProgressBar
          duration={15}
          onTimeUp={timeUp}
          resetTime={resetTime}
          answerMode={answerMode}
        />
      </div>
      <div className={style.content}>
        <div className={style.title}>
          <p className={style.question}>{questions[curQNum]?.question}</p>
          <span className={style.questionCount}>
            {curQNum + 1} / {questions.length}
          </span>
        </div>
        <div className={style.options}>
          {questions[curQNum]?.optionText.map((option, index) => (
            <Option
              key={index}
              text={option}
              onClick={() => clickOption(option)}
              isClicked={clickedOption === option}
              isCorrect={option === questions[curQNum]?.answer}
              index={index}
              answerMode={answerMode}
            />
          ))}
        </div>
      </div>
      {answerMode && (
        <button className={style.nextButton} onClick={nextQuestion}>
          next
        </button>
      )}
    </div>
  );
};

export default QuizBox;
