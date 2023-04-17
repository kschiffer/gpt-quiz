import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ChatMessage from './components/chat-message';
import OptionsInput from './components/options-input';
import axios from 'axios';
import classnames from 'classnames'
import './quiz.css';

function Quiz() {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  console.log(quizData)
  const question = quizData ? quizData.quiz[questionIndex] : null;
  
  const handleAnswerSelect = useCallback((answer) => {
    setAnswers(answers => [...answers, answer.value])
    setTimeout(() => {
        setQuestionIndex(questionIndex => questionIndex + 1)
    }, 2000)
  })

  // Fetch the quiz data from localhost:3000/quiz/:quizId
  useEffect(() => {
    const fetchQuiz = async () => {
        const response = await axios.get(`http://localhost:3000/quiz/${quizId}`)
        console.log(response.data)
        setQuizData(response.data)
    }
    fetchQuiz()
  }, [quizId])

  const hasAnswerForCurrentQuestion = answers.length - 1  === questionIndex;


    if (!quizData) {
        return <div>Loading...</div>
    }

    if (questionIndex >= quizData.quiz.length) {
        return (
            <div className="container gap-3">
                <ChatMessage fullSize icon="cute" message={{ type: 'user', content: `You're done, cowboy!` }} />
                <ChatMessage fullSize message={{ type: 'user', content: `You got ${answers.filter((a,i) => a === quizData.quiz[i].correctAnswerIndex).length} out of ${quizData.quiz.length} correct!` }} />
                <OptionsInput primary fullSize options={[{ label: 'Start over', value: 'start-over' }]} onSelectOption={() => window.location = '/'} />
            </div>
        )
    }

    return (
        <div className="container gap-3">
            <ChatMessage fullSize icon="nerd" message={{ type: 'user', content: question.question }} />
            <OptionsInput key={question.question} fullSize options={question.choices.map((a,i) => ({ label: a, value: i, className: classnames({ incorrect: i !== question.correctAnswerIndex, correct: i === question.correctAnswerIndex, selected: i === answers[questionIndex], reveal: hasAnswerForCurrentQuestion }) }))} onSelectOption={handleAnswerSelect} />
        </div>
    )
}

export default Quiz;