import { useEffect, useState } from "react";
import User from "../User/user";
import style from "./lank.module.css";
import axios from "axios";

const Lank = () => {
  const [rank, setRank] = useState([]);

  useEffect(() => {
    requestRanking();
  }, []);

  const requestRanking = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/ranking"
      );
      setRank(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.title}>순위</div>
      <div className={style.contents}>
        {rank.map((user, index) => {
          <User key={index} user={user} lank={index} />;
        })}
      </div>
    </div>
  );
};
export default Lank;
