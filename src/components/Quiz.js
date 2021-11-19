import React, { Component } from 'react'

import QuizData from './questions'


const quizArray = QuizData;

let srNo = 0;

let newArray = [];
for(let i=0; i<=3; i++) {
    let index = Math.floor(Math.random()*quizArray.length);
    newArray.push(quizArray[index]);
    quizArray.splice(index, 1);
    // console.log(i+1);
 }


export class Quiz extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            userAnswer:null,    //current users answer
            currentIndex:0,  //current questions index
            options: [],       //the four options
            quizEnd: false, //True if it's the last question
            score: 0,      //the Score
            disabled: true,
            nextdisabled:false,
            finishdisabled:false,
            status:""
        }
    }

    loadQuiz = () => {
        const {currentIndex} = this.state //get the current index
        this.setState(() => {
            return {
                question: newArray[currentIndex].question,
                options : newArray[currentIndex].options,
                answer: newArray[currentIndex].answer          
            }
        }
        )
    }

    //Handles Click event for the next button
    nextQuestionHander = () => {
        const {userAnswer, answer, score} = this.state
        this.setState({
            currentIndex: this.state.currentIndex + 1
        })
        this.setState({
            status: ""
        })
        //Check for correct answer and increment score
        if(userAnswer === answer){
            this.setState({
                score: score + 1
            })
        }
    }
    //Load the quiz once the component mounts
    componentDidMount(){
        this.loadQuiz();
    }

    //Update the component
    componentDidUpdate(prevProps, prevState){
        const{currentIndex} = this.state;
        if(this.state.currentIndex !== prevState.currentIndex){
            this.setState(() => {
                return {
                    disabled: true,
                    question: QuizData[currentIndex].question,
                    options : QuizData[currentIndex].options,
                    answer: QuizData[currentIndex].answer          
                }
            });

        }
    }

    //Check the answer
    checkAnswer = answer => {
        this.setState({
            userAnswer: answer,
            disabled:false
        })
    }

    //Responds to the click of the finish button
    finishHandler =() => {
        if(this.state.currentIndex === QuizData.length -1){
            this.setState({
                quizEnd:true,
                finishdisabled:true
            })
        }

    }

    showAnswer = () =>{
       
        if(this.state.userAnswer == this.state.answer){            
            
            this.setState({
                status: "Correct",
                disabled:true,
                nextdisabled:false,
                finishdisabled:false
            })
        }else{
            
            this.setState({
                status: "Wrong",
                disabled:true,
                nextdisabled:false,
                finishdisabled:false
            })
        }
    }

    render() {
        const {question, options, currentIndex, userAnswer, quizEnd} = this.state //get the current state       
        if(quizEnd) {
            return (
                <div>
                    <h1>Game Over. Final score is {this.state.score} points</h1>
                    <p>The correct Answers for the quiz are</p>
                    <ul>
                        {QuizData.map((item, index) => (
                            <li className='options'
                                key={index}>
                                    {item.answer}
                            </li>
                     ))}
                    </ul>
                </div>
            )
        }
        return (
            <div>
                <h1>Quiz App</h1>
                <h2>{question}</h2>
                <span>{`Question ${currentIndex+1} of ${QuizData.length}`}</span>
                {options.map(option => (  //for each option, new paragraph
                    <p key={option.id} 
                    disabled = {this.state.disabled}
                    className={`options ${userAnswer === option ? "selected" : null} ${this.state.status === ""? "peventblock" : "peventnone"}`}
                    onClick= {() => this.checkAnswer(option)}>
                        {option}
                    </p>                

                ))}
                {
                    this.state.status != "" &&
                    <p>{this.state.status}{this.state.answer}</p>
                    
                                        
                }
                <p></p>
                <button
                    className="ui inverted button" 
                    // disabled = {this.state.disabled}
                    onClick = {this.showAnswer}
                    className={this.state.disabled==true?"btnhide":"btnshow"}

                >
                    Submit
                </button>

                {currentIndex < QuizData.length -1 &&  
                // Next button only displays if the above is true
                <button 
                    className="ui inverted button" 
                    disabled = {this.state.nextdisabled}
                    onClick = {this.nextQuestionHander}
                 >Next Question</button>
                }
                 {currentIndex === QuizData.length -1 &&
                    <button
                    className="ui inverted button"
                    disabled = {this.state.finishdisabled}
                    onClick = {this.finishHandler}
                    >Finish</button>
                 }
            </div>
        )
    }
}

export default Quiz

