import style from "./user.module.css";

const User = ({ user, lank }) => {
  return (
    <div className={style.container}>
      <div className={style.info}>
        <div className={style.lank}>{lank + 1}</div>
        <div className={style.nickName}>{user.nickname}</div>
      </div>
      <div className={style.score}>{user.score}점</div>
    </div>
  );
};

export default User;
