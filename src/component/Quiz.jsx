import React from 'react';
import Logo from '../images/logo.jpg';
import QuestionData from '../questions.json';
import StarRatingComponent from 'react-star-rating-component';
import  ProgressBar from 'react-bootstrap/ProgressBar';

class Quiz extends React.Component
{
    state = {
        index: 0,
        isChecked: false,
        questionLength: QuestionData.length - 1,
        isFinish: false,
        rating: 0,
        questionProgress: 1,
        score: 0,
        isCorrect: false,
        inNotCorrect: false,
        correctAnswer: '',
        answers: [],
        questions: [],
        currentQuestionNumber: 0,
        remainingQuestion: 0,
        isStart: false,
        questionCategory: '',
    }

    componentDidMount() {
        const {index} = this.state
        let answers = [QuestionData[index].correct_answer, QuestionData[index].incorrect_answers[0], QuestionData[index].incorrect_answers[1], QuestionData[index].incorrect_answers[2]]
        let shuffleAnswers = answers.sort((a, b) => 0.5 - Math.random())
        let filterQuestions = QuestionData[index].question.replace(/(%20|%27|%3F)/g, ' ')
        let filterAnswers = shuffleAnswers.map(e => e.replace(/(%20|%27|%3F)/g, ' '))
        let filterCorrectAnswer = QuestionData[index].correct_answer.replace(/(%20|%27|%3F)/g, ' ')
        let filterCategory = QuestionData[index].category.replace(/(%20|%27|%3F|%3A)/g, ' ')

        let stars;
        if(QuestionData[index].difficulty === 'easy')
        {
            stars = 1
        }
        if(QuestionData[index].difficulty === 'medium')
        {
            stars = 3
        }
        else
        {
            stars = 5
        }
        
        this.setState({
            rating: stars,
            answers: filterAnswers,
            questions: filterQuestions,
            correctAnswer: filterCorrectAnswer,
            questionCategory: filterCategory,
        })
    }

    checkPoint = (e) => {
        if (e === this.state.correctAnswer) {
            this.setState({
                isCorrect: true,
                score: this.state.score + 1,    
            })
        }
        else
        {
            this.setState({
                isNotCorrect: true,
            })
        }

        this.setState({
            isChecked: true,
            currentQuestionNumber: this.state.currentQuestionNumber + 1,
            remainingQuestion: QuestionData.length - this.state.questionProgress,
        })
    }

    nextQuestion = () => {
        let index = this.state.index + 1;
        let answers = [QuestionData[index].correct_answer, QuestionData[index].incorrect_answers[0], QuestionData[index].incorrect_answers[1], QuestionData[index].incorrect_answers[2]]
        let shuffleAnswers = answers.sort((a, b) => 0.5 - Math.random())
        let filterQuestions = QuestionData[index].question.replace(/(%20|%27|%3F|%22|%2C|%2)/g, ' ')
        let filterAnswers = shuffleAnswers.map(item => item ? item.replace(/(%20|%27|%3F|%22|%2C|%2)/g, ' ') : '')
        let filterCorrectAnswer = QuestionData[index].correct_answer.replace(/(%20|%27|%3F)/g, ' ')
        let filterCategory = QuestionData[index].category.replace(/(%20|%27|%3F|%3A)/g, ' ')

        let stars;
        if(QuestionData[index].difficulty === 'easy')
        {
            stars = 1
        }
        else if(QuestionData[index].difficulty === 'medium')
        {
            stars = 3
        }
        else
        {
            stars = 5
        }
        
        this.setState({
            rating: stars,
            index: index,
            isChecked: false,
            questionProgress: this.state.questionProgress +1,
            answers: filterAnswers,
            questions: filterQuestions,
            correctAnswer: filterCorrectAnswer,
            isCorrect: false,
            questionCategory: filterCategory,
        })

        if (index === 19) {
            this.setState({ isFinish: true })
        }
    }

    render() {
        const {questionProgress, score, currentQuestionNumber, remainingQuestion, index, questionCategory, questions, isChecked} = this.state
        let newQuestionProgress = (questionProgress / QuestionData.length) * 100;
        let currentScore = currentQuestionNumber > 0 ? (score / currentQuestionNumber) * 100 : 0;
        let maxScore = currentQuestionNumber > 0 ? ((score + remainingQuestion) / QuestionData.length) * 100 : 100;
        let minScore = currentQuestionNumber > 0 ? (score / QuestionData.length) * 100 : 0;

        return (
            <div className="quiz">
                {this.state.isStart === true && <div className="content">
                    <div className="header">
                        <img className="logo" src={Logo} alt="..." />
                        <h4>Quiz Application - React JS</h4>
                    </div>
                    <div>
                        <ProgressBar animated now={newQuestionProgress.toFixed(0)} label={`${newQuestionProgress.toFixed(0)}%`} />
                    </div>
                    <div className="questionNumber">
                        <h3>Question <span>{index + 1}</span>/20</h3>
                    </div>
                    <div className="questionCategory">
                        <p>{questionCategory}</p>
                    </div>
                    <div className="questionDifficulty">
                        <StarRatingComponent
                            name="Difficulty"
                            starCount={5}
                            value={this.state.rating}
                            editing={false}
                        />
                    </div>
                    <div className="questions">
                        <h5>{questions}</h5>
                    </div>
                    <div className="answers">
                        <div>
                            {isChecked && <p className={`${this.state.answers[0] == this.state.correctAnswer ? 'correct-answer' : 'incorrect-answer'}`} onClick={() => this.checkPoint(this.state.answers[0])}>{this.state.answers[0]}</p>}
                            {!isChecked && <p onClick={() => this.checkPoint(this.state.answers[0])}>{this.state.answers[0]}</p>}

                            {isChecked && <p className={`${this.state.answers[1] == this.state.correctAnswer ? 'correct-answer' : 'incorrect-answer'}`} onClick={() => this.checkPoint(this.state.answers[1])}>{this.state.answers[1]}</p>}
                            {!isChecked && <p onClick={() => this.checkPoint(this.state.answers[1])}>{this.state.answers[1]}</p>}
                        </div>
                        <div>
                            {isChecked && <p className={`${this.state.answers[2] == this.state.correctAnswer ? 'correct-answer' : 'incorrect-answer'}`} onClick={() => this.checkPoint(this.state.answers[2])}>{this.state.answers[2]}</p>}
                            {!isChecked && <p onClick={() => this.checkPoint(this.state.answers[2])}>{this.state.answers[2]}</p>}

                            {isChecked && <p className={`${this.state.answers[3] == this.state.correctAnswer ? 'correct-answer' : 'incorrect-answer'}`} onClick={() => this.checkPoint(this.state.answers[3])}>{this.state.answers[3]}</p>}
                            {!isChecked && <p onClick={() => this.checkPoint(this.state.answers[3])}>{this.state.answers[3]}</p>}
                        </div>
                    </div>
                    <div className="nextQuestion">
                        <div>
                            {isChecked && this.state.isCorrect && <p className="correct">Correct!</p>}
                            {isChecked && !this.state.isCorrect && <p className="wrong">Sorry!</p>}
                        </div>
                        <div>
                            {!this.state.isFinish && isChecked === true && <button onClick={this.nextQuestion}>NEXT</button>}
                            {this.state.isFinish && isChecked === true && <button onClick={() => window.location.reload(false)}>FINISH</button>}
                        </div>
                    </div>
                    <div className="score">
                        <div className="progress-score">
                            <p className="current-score">Score: {currentScore.toFixed(0)}%</p>
                            <p className="max-score">Max Score: {maxScore.toFixed(0)}%</p>
                        </div>
                        <ProgressBar>
                            <ProgressBar animated striped variant="success" now={minScore.toFixed(0)} label={`${minScore.toFixed(0)}%`} key={1} />
                            <ProgressBar animated variant="warning" now={currentScore.toFixed(0)} label={`${currentScore.toFixed(0)}%`} key={2} />
                            <ProgressBar animated striped variant="danger" now={maxScore.toFixed(0)} label={`${maxScore.toFixed(0)}%`} key={3} />
                        </ProgressBar>
                    </div>
                </div>}
                { this.state.isStart === false &&
                    <div className="start">
                        <p onClick={() => this.setState({isStart: true})}>Start Quiz</p>
                    </div>
                }
            </div>
        )
    }
}

export default Quiz;



