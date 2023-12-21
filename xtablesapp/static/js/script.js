let score = 0;
let asked = 0;
let turns = 25;
let seconds = 6;
let timer;
let startTime;
let user = document.getElementById('username').innerText;
let tables = document.getElementsByClassName('timesTables');
tablesArray = [];
for(let i = 0;i<tables.length;i++){
    let number = parseInt(tables[i].innerText)
    tablesArray.push(number)
}
console.log(tablesArray);
let amountOfTables = tablesArray.length;
let xIndex = Math.floor(Math.random() * amountOfTables);
let x = tablesArray[xIndex]
let y = Math.floor(Math.random() * 11) + 2;


function startTimer() {
    if(asked<turns){
        startTime = Date.now(); // Record the start time
        timer = setTimeout(function() {
            checkAnswer();
            updateScore();
            createQuestion();
            startTimer();
            

        }, seconds*1000);
    }
    else{
        console.log('activity finished');
        document.getElementById('answer').remove();
        let element = document.getElementById('question');
        element.innerText = 'Activity finished';
    }        
    

}
function resetTimer() {
    // Reset the timer by clearing the previous timeout and starting a new one
    console.log('timer stopped');
    clearTimeout(timer);
    startTimer();
}

//CALL THIS WHEN ENTER PRESSED^



document.addEventListener('keydown', function(event) {
    // Check if the pressed key is the desired key (e.g., 'a' or 'A')
    if (event.key === 'Enter' && asked<turns) {
      checkAnswer();
      updateScore();
      createQuestion();
      resetTimer();
    }
});


const inputField = document.getElementById('answer');

inputField.addEventListener('blur', function() {
    inputField.focus();
});


window.onload = function() {
    document.getElementById('answer').focus();
    createQuestion();
    startTimer();
};



function createQuestion(){
    if(asked>24){
        
    }
    else{
        
        xIndex = Math.floor(Math.random() * amountOfTables);
        x = tablesArray[xIndex]
        y = Math.floor(Math.random() * 11) + 2;
        let element = document.getElementById('question');;
        element.innerText = `${x} x ${y} =`;
    }
}

function checkAnswer (){
    timeTaken = getElapsedTime();
    console.log(`${timeTaken} ms elapsed`);
    let correct = true;
    let input = document.getElementById('answer');
    if(input.value==x*y){
        score++;
        asked++;
    }
    else{
        correct = false;
        asked++;
    }
    var formData = new FormData();
    formData.append('correct', correct);
    formData.append('time_taken', timeTaken);
    formData.append('user', user);
    formData.append('x', x);
    formData.append('y', y);

    fetch('create_attempt', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Data sent successfully.');
        } else {
            console.error('Error:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    input.value = "";
}

function updateScore(){
    let displayScore = document.getElementById('score');
    displayScore.innerText = `Score: ${score}/${asked}`;
    document.getElementById('answer').focus();
}

function getElapsedTime() {
    const elapsedTime = Date.now() - startTime;
    return elapsedTime;
}
