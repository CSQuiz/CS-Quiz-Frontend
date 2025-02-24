import style from "./user.module.css";

const User = () => {
  return (
    <div className={style.container}>
      <div className={style.info}>
        <div className={style.lank}>1</div>
        <div className={style.nickName}>붕붕이</div>
      </div>
      <div className={style.score}>100점</div>
    </div>
  );
};

export default User;
