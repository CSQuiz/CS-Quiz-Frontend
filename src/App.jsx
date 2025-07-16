import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/home";
import QuizBox from "./components/QuizBox/quizBox";
import Score from "./components/Score/score";
import Rank from "./components/Rank/rank";
import CustomModal from "./components/CustomModal/customModal";
import { useState } from "react";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  return (
    <>
      {modalOpen && <CustomModal handleModal={setModalOpen} text={modalText} />}
      <div className="wrapper">
        <h1>CS Quiz</h1>
        {/* <Router basename={process.env.PUBLIC_URL}> */}
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
