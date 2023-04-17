const { Configuration, OpenAIApi } = require("openai")
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const yaml = require('yaml')
const quizzes = require('./quiz-db')

module.exports.generateQuiz = async (topic, questionCount = 10, answerCount = 4, difficulty = 'normal', language = 'english') => {
    // Generate a UUID for the quiz
    const quizId = uuidv4();
    const prompt = `${questionCount} questions with ${answerCount} choices and 1 correct answer. be extra careful and correct with the questions and answers.
output format yaml with keys: question, choices, correctAnswerIndex
output rules: wrap strings in quotes
topic: ${topic}
language: ${language}
difficulty: ${difficulty}`
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(configuration)

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        max_tokens: 1000,
        temperature: .7,
    });

    // Remove possible '```' from the beginning and end of the completion
    sanitizedOutput = completion.data.choices[0].message.content.replace(/```yaml|```/g, '')

    try {
        quizzes.addQuiz(quizId, { topic, questionCount, answerCount, difficulty, createdAt: Date.now() }, yaml.parse(sanitizedOutput))
        console.log(sanitizedOutput)

        return quizId 
    } catch (error) {
        console.log(error)

        return null
    }
}