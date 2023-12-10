import React from 'react';

export default function App()
{
const [getMathproblem,setMathproblem] = React.useState(getRandomProblem);
const [currentResponse,setCurrentResponse] = React.useState("");
const [answerStatus, setAnswerStatus] = React.useState("")
console.log(getMathproblem);
console.log(currentResponse)

function getRandomProblem(){
    const firstNumber = getRandomNumber(10);
    const secondNumber = getRandomNumber(10);
    const operator = getRandomOperator();
    
    if(operator === "÷" && secondNumber == 0){
        secondNumber = 1 + getRandomNumber(9)
    }
    
    const sumObject = {
        string : `${firstNumber} ${operator} ${secondNumber} =`,
        answer : getCorrectAnswer(firstNumber,operator,secondNumber),
    }
    
    return sumObject;
}

function getRandomNumber(max){
    return Math.round(Math.random() * max)
}
function getRandomOperator(){
    const operators = ["+", "-", "x", "÷"];
    return operators[getRandomNumber(3)]
}

function getCorrectAnswer(f,o,s)
{
    if(o==="+"){
        return f + s;
    }else if (o === "-") {
            return f - s
        } else if (o === "x") {
            return f * s
        } else {
            return f / s
        }
}

function updateResponse(e)
{
   
 setCurrentResponse(e.target.value);   
}





function handleSubmit(e){
    e.preventDefault()
      let val = currentResponse
    if(val==getMathproblem.answer){
        console.log("ITS CORRECT")
    }else{
        console.log("ITS FALSE")
    }
    
    setAnswerStatus(() => getAnswerStatus(val))
}

    function getAnswerStatus(num) {
        if (num < getMathproblem.answer) {
            return "Too Low."
        } else if (num > getMathproblem.answer) {
            return "Too High."
        } else if (num == getMathproblem.answer) {
            return "Correct!"
        } else {
            return "Invalid Input."
        }
    }
    
    function getNewProblem() {
        setAnswerStatus("")
        setCurrentResponse("")
        setMathproblem(getRandomProblem)
    }

    // if (answerStatus === "Correct!") {
    //     inputClass += "input-accepted"
    // }
    
    const messageClass = answerStatus
        .toLowerCase()
        .split(" ")
        .join("-")
        .slice(0, -1)

    return (
        <div className="wrapper">
      
         
        <form onSubmit={handleSubmit}>
        <label>
        <div className="problem-container">{getMathproblem.string}</div>
        <input
                        type = "number"
                        name="value"
                        placeholder="?"
                        onChange={updateResponse}
                        value={currentResponse}
                        autoComplete="off"
                        required
        />
        </label>
        <br/>
            
        <div className={`message-container ${messageClass}`}>
                        {answerStatus}
        </div>
                
        <div className="button-container">
            <button 
                    className="check-answer-button" 
                    type="submit">
                    <span>Check Answer</span>
            </button>
         <button 
            type="button" 
            className="new-problem-button" 
            onClick={getNewProblem}
            >
            <span>New Problem</span>
        </button>
        </div>
        
          </form>
      
        </div>
    )
}