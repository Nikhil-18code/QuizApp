const startButton=document.querySelector('#start-btn');
const nextButton=document.querySelector('#next-btn');
const questionContainerElement=document.querySelector('#question-container');
const questionElement=document.getElementById('question');
const answerButtonsElement=document.getElementById('answer-buttons');
let shuffleQuestions,currentQuestionIndex;
startButton.addEventListener('click',startGame)
nextButton.addEventListener('click',()=>{
    currentQuestionIndex++;
    setNextQuestion();
})
function startGame(){
    startButton.classList.add('hide');
    shuffleQuestions=questions.sort(()=>Math.random()-0.5);
    currentQuestionIndex=0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}
function setNextQuestion(){
    resetState();
    showQuestion(shuffleQuestions[currentQuestionIndex]);
}
function showQuestion(question){
    questionElement.innerText=question.question;
    question.answers.forEach(answer=>{
        const button=document.createElement('button');
        button.innerText=answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener('click',selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}
function resetState(){  
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton=e.target;
    const correct=selectedButton.dataset.correct;
    setStatusClass(document.body,correct);
    Array.from(answerButtonsElement.children).forEach(button=>{
        setStatusClass(button,button.dataset.correct);
    })
    console.log(shuffleQuestions.length);
    if(shuffleQuestions.length>currentQuestionIndex+1)
        nextButton.classList.remove('hide');
    else{
        startButton.innerText='Restart';
        startButton.classList.remove('hide');
    }
}
function setStatusClass(element,correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add('correct');
    }
    else{
        element.classList.add('wrong');
    }
}
function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
const questions=[
    {
        question:'What is 2+2?',
        answers:[
            {text:'4',correct:true},
            {text:'22',correct:false}
        ]
    },
    {
        question:'What is 4*4?',
        answers:[
            {text:'16',correct:true},
            {text:'22',correct:false}
        ]
    },
    {
        question:'Who is Best Batsman In the World?',
        answers:[
            {text:'Virat Kohli',correct:true},
            {text:'Kane Williamson',correct:false},
            {text:'Steven Smith',correct:false},
            {text:'Joe root',correct:false}
        ]
    }
]