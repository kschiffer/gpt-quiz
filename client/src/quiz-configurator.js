import { useState, useEffect, useCallback } from 'react';
import './quiz-configurator.css';
import ChatMessage from './components/chat-message';
import TextInput from './components/text-input';
import OptionsInput from './components/options-input';
import axios from 'axios';

function App() {
  const [topic, setTopic] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [quizId, setQuizId] = useState(null);

  const difficultyOptions = [
    { label: 'Easy', value: 'easy' },
    { label: 'Normal', value: 'normal' },
    { label: 'Hard', value: 'hard' },
    { label: 'Ultra expert mode', value: 'ultra-expert' },
  ];

  useEffect(() => {
    console.log('test')
    const fetchQuiz = async () => {
      if (Boolean(difficulty)) {
        const result = await axios.post('http://localhost:3000/quiz', { topic, difficulty: difficulty.value })
        const quizId = result.data
        setQuizId(quizId)
      }
    }

    fetchQuiz()
  }, [difficulty, topic])

  const onStartQuiz = useCallback(() => {
    window.location = `/quiz/${quizId}`
  }, [quizId])


  return (
    <div className="container gap-3">
      <ChatMessage icon="cute" message={{ type: 'user', content: `Hi I'm Walter the totally not AI-controlled quiz mouse. I can generate you interesting quizzes about any topic you like!` }} />
      <ChatMessage message={{ type: 'user', content: `About what topic should I generate a quiz for you?` }} />
      <TextInput autoFocus onSubmit={setTopic} disabled={Boolean(topic)} topic={topic} />
      { Boolean(topic) && (
        <>
          <ChatMessage icon="nerd" message={{ type: 'user', content: `Great! I'll generate a quiz for you about ${topic}.` }} />
          <ChatMessage message={{ type: 'user', content: `What should the difficulty be?` }} />
          <OptionsInput options={difficultyOptions} onSelectOption={setDifficulty} selectedOption={difficulty?.value} />
        </>
      )}
      { Boolean(difficulty) && !Boolean(quizId) && (
          <ChatMessage icon="inhole" withLoading message={{ type: 'user', content: `Got it cowboy! Let me find a quiz for you. I'll be back in a sec!` }} />
      )}
      { Boolean(quizId) && (
        <>
          <ChatMessage icon="cute" message={{ type: 'user', content: `Okäse, I'm done. Are you ready?` }} />
          <OptionsInput options={[{label: `Yes, let's go!`, value: 'start', classNames: 'bg-purple-600 text-white' }]} onSelectOption={onStartQuiz} />
        </>
      )}
    </div>
  );
}

export default App;
