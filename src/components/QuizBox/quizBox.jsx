import { useState, useEffect } from "react";
import style from "./quizBox.module.css";
import Option from "../Option/option";
import ProgressBar from "../ProgressBar/progressBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuizBox = () => {
  const [question, setQuestion] = useState({}); //질문 리스트
  const [selectedOption, setSelectedOption] = useState(undefined); //선택한 옵션
  const [resetTime, setResetTime] = useState(0); // 타이머 리셋용 키
  const [answerMode, setAnswerMode] = useState(false);
  const navigate = useNavigate();

  const gameId = localStorage.getItem("gameId");

  useEffect(() => {
    requestQuestion();
  }, []);

  const clickOption = (option) => {
    if (!answerMode) {
      //문제 풀기 모드라면 사용자가 선택한 보기를 값으로 선택
      setSelectedOption(option);
      setAnswerMode(true); // 사용자가 옵션을 클릭하면 답 출력 모드로 변경
      requestAnswer();
    }
  };

  const timeUp = () => {
    if (!answerMode) {
      setAnswerMode(true);
      setSelectedOption(undefined); //사용자가 선택하지 않은 경우를 나타내기 위해 null로 설정
    }
  };

  //서버에서 채점하기 위한 요청
  const requestAnswer = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/game/${gameId}/answer`,
        { questionId: question.id, answer: selectedOption }
      );
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  const requestQuestion = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/game/${gameId}/next`
      );
      if (!response.lastQuestion) {
        setQuestion(response);
        setSelectedOption(undefined);
        setAnswerMode(false);
        setResetTime((prev) => prev + 1);
      } else {
        navigate("/score");
      }
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
          <p className={style.question}>{question?.question}</p>
          <span className={style.questionCount}>{question?.id} / 10</span>
        </div>
        <div className={style.options}>
          {question?.optionText.map((option, index) => (
            <Option
              key={index}
              text={option}
              onClick={() => clickOption(option)}
              isCorrect={option === question?.answer}
              index={index}
              answerMode={answerMode}
            />
          ))}
        </div>
      </div>
      {answerMode && (
        <button className={style.nextButton} onClick={requestQuestion}>
          next
        </button>
      )}
    </div>
  );
};

export default QuizBox;
