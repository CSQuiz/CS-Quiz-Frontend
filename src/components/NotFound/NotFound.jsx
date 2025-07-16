import style from "./NotFound.module.css";
import { PiSmileyXEyes } from "react-icons/pi";

const NotFound = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.icon}>
        <PiSmileyXEyes />
      </div>
      <span>존재하지 않는 페이지입니다.</span>
    </div>
  );
};

export default NotFound;
