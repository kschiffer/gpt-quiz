const express = require('express');
const bodyParser = require('body-parser');
const yaml = require('yaml')
const { generateQuiz } = require('./gpt');
const quizzes = require('./quiz-db');
// CORS
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(bodyParser.json());

app.post('/quiz', async (req, res) => {
  const topic = req.body.topic;
  const difficulty = req.body.difficulty;
  if (!topic) {
    return res.status(400).send({ error: 'Missing topic in request body' });
  }

  try {
    const quizId = await generateQuiz(topic, undefined, undefined, difficulty);
    res.status(200).send(quizId);
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to generate quiz' });
  }
});

app.get('/quiz/:quizId', (req, res) => {
    quiz = quizzes.getQuiz(req.params.quizId)

    res.status(200).send(quiz)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
