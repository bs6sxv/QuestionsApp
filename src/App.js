
import React, { useState, useEffect } from "react";
import { Button, TextField , Typography} from "@material-ui/core";
import './App.css';
import Box from '@material-ui/core/Box';

export default function App() {
  const [questions, setQuestions] = useState([]);
  let api = "https://opentdb.com/api.php?amount="
  let quesAmount = "10"

  const apiFunc = () => {
    quesAmount =  document.getElementById("text").value;
    let url = api + quesAmount;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setQuestions(res.results);
      })
      setStartScreen(false);
      ;
  };



  const questionsArray = () => {
    setStartScreen(false);
        // setQuestions([
        //   questions.map(each => { 
        //       return {
        //         ...each,
        //         incorrect_answers: each.incorrect_answers.push(each.correct_answer)
        //       };
        //   })
        // ]);
        
      }

const [currentQuestion, setCurrentQuestion] = useState(0);

const [showScore, setShowScore] = useState(false);

const [startScreen, setStartScreen] = useState(true);

const [score,setScore] = useState(0);

const handleWrongAnswerButtonClick = () => {
  alert("answer is wrong!")
  const nextQuestion =  currentQuestion + 1;
  if (nextQuestion < questions.length){
    setCurrentQuestion(nextQuestion)
  } else {
    setShowScore(true);
  }
}

  const handleRightAnswerButtonClick = () => {
    alert("answer is correct!")
    setScore(score+1);
    const nextQuestion =  currentQuestion + 1;
    if (nextQuestion < questions.length){
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true);
    }

}
const decodeHTMLEntities = text => {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}
  return (
    <div className="game-app" >
    {/* <body onload={questionsArray}></body> */}
   <Box m={1.5}><Typography variant="h3" component="h2" className="title">Trivia Game</Typography></Box>
      {showScore ? (
				<div className='score-section'> 
        <h2><Box m={1.5}><div>You scored {score} out of {questions.length}!</div></Box></h2>
        <h3><div>Play again? Refresh the Page!</div></h3>
        </div>
			) : 
      (
				<>
        { startScreen ? (
          <div>
            <h1><Box m={5}><div>Ready to Play?</div></Box></h1>
            <Box m={1.5}>Enter Number of Questions:</Box> <div className="questions-amount"><input id="text"></input></div>
            <Button onClick={apiFunc} type="submit" variant="contained" color="primary">Start</Button>
          </div>
        ) : ( 
          <>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
            <h2 className='question-text'> {decodeHTMLEntities(questions[currentQuestion]?.question)}</h2>
						{/* <div className='question-text'>{questions[currentQuestion]?.question}</div> */}
					</div> 
					<div className='answer-section'>
						{questions[currentQuestion]?.incorrect_answers.map((answerOptions)=>
            // <button onClick={handleWrongAnswerButtonClick}>{answerOptions}</button>)
            <Box m={1.5}><div className="choices"><Button m={2} onClick={handleWrongAnswerButtonClick} variant="contained" color="primary" >{decodeHTMLEntities(answerOptions)}</Button></div></Box>)}
            <Button onClick={handleRightAnswerButtonClick}variant="contained" color="primary">{decodeHTMLEntities(questions[currentQuestion]?.correct_answer)}</Button>
					</div> 
          <div className='question-correct'><b>Correct: {score}</b> </div>
          </>
          )} 
          
				</>
			)}
    </div>
  );
}