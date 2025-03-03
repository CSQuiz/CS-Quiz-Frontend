import { useState, useEffect } from "react";
import style from "./quizBox.module.css";
import Option from "../Option/option";
import ProgressBar from "../ProgressBar/progressBar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizBox = () => {
  const [questions, setQuestions] = useState([]); // 질문 리스트
  const [curQNum, setCurQNum] = useState(0); // 현재 질문 번호
  // const [selectedOption, setSelectedOption] = useState(undefined); // 선택한 옵션
  const [resetTime, setResetTime] = useState(0); // 타이머 리셋용 키
  const [answerMode, setAnswerMode] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const gameQuestions = location.state;

  const gameId = localStorage.getItem("gameId");

  useEffect(() => {
    if (gameQuestions.length > 0) {
      setQuestions(gameQuestions);
      console.log(`질문: ${questions}`);
    }
  }, []);

  const nextQuestion = () => {
    if (curQNum < questions.length - 1) {
      setCurQNum(curQNum + 1); // 다음 문제로 이동
      // setSelectedOption(undefined); // 선택한 보기 초기화
      setAnswerMode(false); // 문제 풀기 모드로 되돌아감
      setResetTime((prev) => prev + 1); // 타이머 리셋
      console.log("현재 문제", questions[curQNum]);
    } else {
      navigate("/score"); // 마지막 문제일 경우 결과 페이지 이동
    }
  };

  const clickOption = (option) => {
    if (!answerMode) {
      // setSelectedOption(option);
      setAnswerMode(true); // 사용자가 옵션을 클릭하면 답 출력 모드로 변경
      requestAnswer(option);
    }
  };

  const timeUp = () => {
    if (!answerMode) {
      setAnswerMode(true);
      // setSelectedOption(undefined); // 사용자가 선택하지 않은 경우를 나타내기 위해 null로 설정
    }
  };

  // 서버에서 채점하기 위한 요청
  const requestAnswer = async (option) => {
    try {
      console.log("사용자가 선택한 정답", option);
      const response = await axios.post(
        `http://localhost:8080/api/game/${gameId}/answer`,
        { questionId: questions[curQNum]?.id, answer: option }
      );
      console.log("정답 여부", response.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.timeBar}>
        <ProgressBar
          duration={5}
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
