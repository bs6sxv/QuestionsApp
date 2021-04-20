
import React, { useState, useEffect } from "react";
import { Button, TextField , Typography} from "@material-ui/core";
import './App.css';
import Box from '@material-ui/core/Box';

export default function App() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setQuestions(res.results);
      })
      
      ;
  }, []);


  const questionsArray = () => {
        setQuestions(
          questions.forEach((each)=> {each.incorrect_answers.push(each.correct_answer)})
        );
      }
const [currentQuestion, setCurrentQuestion] = useState(0);

const [showScore, setShowScore] = useState(false);

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
            {/* {questionsArray} */}
            {/* {questions.forEach((each)=> {each.incorrect_answers.push(each.correct_answer)})} */}
						{questions[currentQuestion]?.incorrect_answers.map((answerOptions)=>
            // <button onClick={handleWrongAnswerButtonClick}>{answerOptions}</button>)
            <Box m={1.5}><div className="choices"><Button m={2} onClick={handleWrongAnswerButtonClick} variant="contained" color="primary" >{decodeHTMLEntities(answerOptions)}</Button></div></Box>)}
            <Button onClick={handleRightAnswerButtonClick}variant="contained" color="primary">{decodeHTMLEntities(questions[currentQuestion]?.correct_answer)}</Button>
					</div>
				</>
			)} 
    </div>
  );
}