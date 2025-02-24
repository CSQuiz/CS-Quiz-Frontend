import { useState, useEffect } from "react";
import style from "./quizBox.module.css";
import Option from "../Option/option";
import ProgressBar from "../ProgressBar/progressBar";
import { useNavigate } from "react-router-dom";
import mockData from "../../../mockData.json";

const QuizBox = () => {
  const [questions, setQuestions] = useState([]); //질문 리스트
  const [curQNum, setCurQNum] = useState(0); //현재 질문 번호
  const [selectedOption, setSelectedOption] = useState(undefined); //선택한 옵션
  const [resetTime, setResetTime] = useState(0); // 타이머 리셋용 키
  const [score, setScore] = useState(0); //누적 점수
  const [answerMode, setAnswerMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setQuestions(mockData);
  }, []);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  // if (questions.length === 0) return <p>Loading...</p>;

  const nextQuestion = () => {
    if (curQNum < questions.length - 1) {
      setCurQNum(curQNum + 1); //다음 문제로 이동
      setSelectedOption(undefined); //선택한 보기 초기화
      setAnswerMode(false); //문제 풀기 모드로 되돌아감
      setResetTime((prev) => prev + 1); // 타이머 리셋
    } else {
      //마지막 문제일 경우 score 확인하러 이동
      navigate("/score");
    }
  };

  const clickOption = (option) => {
    if (!answerMode) {
      //문제 풀기 모드라면 사용자가 선택한 보기를 값으로 선택
      setSelectedOption(option);
      setAnswerMode(true); // 사용자가 옵션을 클릭하면 답 출력 모드로 변경
      if (option === questions[curQNum].answer) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  const timeUp = () => {
    if (!answerMode) {
      setAnswerMode(true);
      setSelectedOption(null); // 사용자가 선택하지 않은 경우를 나타내기 위해 null로 설정
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
            {curQNum + 1} / {questions?.length}
          </span>
        </div>
        <div className={style.options}>
          {questions[curQNum]?.options.map((option, index) => (
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
