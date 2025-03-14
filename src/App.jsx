import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/home";
import QuizBox from "./components/QuizBox/quizBox";
import Score from "./components/Score/score";
import Rank from "./components/Rank/rank";
import CustomModal from "./components/CustomModal/customModal";
import { useState } from "react";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  return (
    <>
      {modalOpen && <CustomModal handleModal={setModalOpen} text={modalText} />}
      <div className="wrapper">
        <h1>CS Quiz</h1>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Home setModalOpen={setModalOpen} setModalText={setModalText} />
              }
            />
            <Route path="/quiz" element={<QuizBox />} />
            <Route path="/score" element={<Score />} />
            <Route path="/rank" element={<Rank />} />
            <Route path="/modal" element={<CustomModal />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
