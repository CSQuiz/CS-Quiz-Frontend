import style from "./option.module.css";
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";

const Option = ({ text, onClick, isCorrect = false, index, answerMode }) => {
  const handleClick = onClick;

  return (
    <button
      className={`${style.outline} ${
        answerMode ? (isCorrect ? style.correct : style.wrong) : ""
      }`}
      onClick={handleClick}
      disabled={answerMode} // 한 번 선택하면 클릭 불가능
    >
      <div className={style.optionIcon}>
        {answerMode ? (
          isCorrect ? (
            <FaCircleCheck className={style.correctIcon} />
          ) : (
            <FaRegCircleXmark className={style.wrongIcon} />
          )
        ) : (
          <div className={style.circle}>{index + 1}</div>
        )}
      </div>

      <p className={style.optionText}>{text}</p>
    </button>
  );
};

export default Option;
