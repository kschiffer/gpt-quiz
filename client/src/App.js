import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizConfigurator from './quiz-configurator';
import Quiz from './quiz';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<QuizConfigurator />} />
          <Route path="/quiz/:quizId" element={<Quiz />} />
        </Routes>
    </Router>
  );
}

export default App;