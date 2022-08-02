// importando as perguntas
import { questions } from './data.js'

const scoreContainer = document.querySelector('.score-container')
const quizContainer = document.querySelector('.quiz-container')
const question = document.querySelector('#question')
const answersBox = document.querySelector('.answers-box')

// Alternativas de respostas
const alternatives = ['a', 'b', 'c', 'd']

let points = 0

let actualQuestion = 0



// Inicia o Quiz
function initQuiz() {
  createQuestion(0)
}

// Cria a pergunta
function createQuestion(i) {
  // Remove as alternativas da questão anterior
  const prevQuestButtons = answersBox.querySelectorAll('button')
  prevQuestButtons.forEach(function (btn) {
    btn.remove()
  })

  // Insere uma nova pergunta
  const questionText = question.querySelector('#question-text')
  const questionNumber = document.querySelector('#question-number')

  questionText.textContent = questions[i].question
  questionNumber.textContent = i + 1

  // Insere as alternativas
  questions[i].answers.forEach(function (answer, i) {
    // Template do botão de respostas
    const answerTemplate = document
      .querySelector('.answer-template')
      .cloneNode(true)

    const btnLetter = answerTemplate.querySelector('#btn-letter')
    const answerText = answerTemplate.querySelector('#question-answer')

    btnLetter.textContent = alternatives[i]
    answerText.textContent = answer['answer']

    answerTemplate.setAttribute('correct-answer', answer['correct'])

    // Remove as classes template e hidden
    answerTemplate.classList.remove('hidden')
    answerTemplate.classList.remove('answer-template')

    // Inserindo as alternativas na tela com o appendChild
    answersBox.appendChild(answerTemplate)

    // Evento de click nas alternativas
    answerTemplate.addEventListener('click', function () {
      checkAnswer(this)
    })
  })
  // Incrementando a posição da questão
  actualQuestion++
}

// Checa a resposta
function checkAnswer(btn) {
  const buttons = answersBox.querySelectorAll('button')

  // Adiciona classes à alternativa correta e às alternativas erradas
  // de selecionadas
  buttons.forEach(function (button) {
    if (button.getAttribute('correct-answer') === 'true') {
      button.classList.add('correct-answer')

      // Se o usuário acertou a pergunta
      if (btn === button) {
        points++
      }
    } else {
      button.classList.add('wrong-answer')
    }
  })
  // Passar para a próxima pergunta
  nextQuestion()
}

// Próxima pergunta
function nextQuestion() {
  // timer
  setTimeout(function () {
    // Checa se há ainda perguntas restantes
    if (actualQuestion >= questions.length) {
      // Mensagem de fim de jogo
      endGame()
      return
    }

    createQuestion(actualQuestion)
  }, 750)
}

function endGame() {
  showScore()

  // Calcula os pontos
  const score = ((points / questions.length) * 100).toFixed(0)

  // Inserindo as informações de placar
  const displayScore = scoreContainer.querySelector('#display-score span')

  displayScore.textContent = score.toString()

  const correctAnswers = document.querySelector('#correct-answers')
  correctAnswers.textContent = points

  const totalQuestions = document.querySelector('#total-questions')
  totalQuestions.textContent = questions.length

  const msg = document.querySelector('#msg')
  if (score < 20) {
    msg.textContent = 'Mandou mal :('
  } else if (score > 20 && score < 60) {
    msg.textContent = 'Precisa melhorar'
  } else if (score > 60 && score < 80) {
    msg.textContent = 'Quase lá, foi bem!'
  } else {
    msg.textContent = 'Parabéns! Atingiu uma ótima pontuação'
  }
}

// Exibe o placar
function showScore() {
  scoreContainer.classList.toggle('hidden')
  quizContainer.classList.toggle('hidden')
}

// Reiniciar o quiz
const restartBtn = document.querySelector('#restart-quiz')
restartBtn.addEventListener('click', function () {
  // reiniciar os stats
  actualQuestion = 0
  points = 0
  showScore()
  initQuiz()
})

// Iniciando o quiz
initQuiz()
