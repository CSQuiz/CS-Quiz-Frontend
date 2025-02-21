import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/home";
import QuizBox from "./components/QuizBox/quizBox";
import Score from "./components/Score/score";
import Lank from "./components/Lank/lank";

function App() {
  return (
    <>
      <h1>CS Quiz</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizBox />} />
          <Route path="/score" element={<Score />} />
          <Route path="/lank" element={<Lank />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
