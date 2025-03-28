import { useEffect, useState } from "react";
import User from "../User/user";
import style from "./rank.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const SERVER = import.meta.env.VITE_SERVER;

const Rank = () => {
  const [rank, setRank] = useState([]);

  useEffect(() => {
    requestRanking();
  }, []);

  const requestRanking = async () => {
    try {
      const response = await axios.get(`${SERVER}/api/users/ranking`);

      setRank(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.title}>순위</div>
      <div className={style.contents}>
        {rank.map((user, index) => (
          <User key={index} user={user} lank={index} />
        ))}
      </div>
      <div className={style.routeHome}>
        <Link to="/"> 홈으로 이동하기</Link>
      </div>
    </div>
  );
};
export default Rank;
