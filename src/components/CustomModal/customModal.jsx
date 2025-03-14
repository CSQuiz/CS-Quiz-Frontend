import { MdOutlineAlarmAdd } from "react-icons/md";
import style from "./customModal.module.css";
import { PiWarning } from "react-icons/pi";
import { useRef } from "react";

const CustomModal = ({ handleModal, text }) => {
  const modalBackground = useRef();

  const handleBackgroundClick = (e) => {
    if (e.target === modalBackground.current) {
      handleModal(false);
    }
  };

  return (
    <div
      className={style.wrapper}
      ref={modalBackground}
      onClick={handleBackgroundClick}
    >
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.icon}>
            <PiWarning />
          </div>
          <div className={style.text}>{text}</div>
        </div>
        <button onClick={() => handleModal(false)}>확인</button>
      </div>
    </div>
  );
};

export default CustomModal;
