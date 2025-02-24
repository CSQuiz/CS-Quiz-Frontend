import User from "../User/user";
import style from "./lank.module.css";

const Lank = () => {
  return (
    <div className={style.container}>
      <div className={style.title}>순위</div>
      <div className={style.contents}>
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
      </div>
    </div>
  );
};
export default Lank;
