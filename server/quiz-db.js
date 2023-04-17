const quizzes = {}

module.exports.addQuiz = (quizId, params, quiz) => {
    quizzes[quizId] = {
        params, quiz
    }
}

module.exports.getQuiz = (quizId) => {
    return quizzes[quizId]
}

module.exports.removeQuiz = (quizId) => {
    delete quizzes[quizId]
}