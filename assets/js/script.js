
var goBtnEl = $('#go')
var questionEl = $('#question')
var headerEl = $('header')
var timerEl = $('#timer')
var fillEl = $('#fill')
var highscoresEl = $('#highscores')
var scoreEl = $('#score')
var showHighscoresEl = $('#show-highscores')
var timer
var correctAnswers = 0;
var incorrectAnswers = 0;
var numOfQuestions = 0
var setTime = 120 // in seconds

// array of highscores
var highscores = []
// array of questions along with their answers
var questions = [question = [
    "What is JavaScript?",
    "JavaScript is a scripting language used to make the website interactive",
    "JavaScript is an assembly language used to make the website interactive",
    "JavaScript is a compiled language used to make the website interactive",
    "None of the mentioned"
], question = [
    "Which of the following is correct about JavaScript?",
    "JavaScript is an Object-Based language",
    "JavaScript is Assembly-language",
    "JavaScript is an Object-Oriented language",
    "JavaScript is a High-level language"
], question = [
    "Among the given statements, which statement defines closures in JavaScript?",
    "JavaScript is a function that is enclosed with references to its lexical environment",
    "JavaScript is a function that is enclosed with references to its inner function scope",
    "JavaScript is a function that is enclosed with the object to its inner function scope",
    "None of the mentioned"
], question = [
    "Arrays in JavaScript are defined by which of the following statements?",
    "It is an ordered list of values",
    "It is an ordered list of objects",
    "It is an ordered list of string",
    "It is an ordered list of functions"
], question = [
    "Which of the following is not javascript data types?",
    "All of the mentioned",
    "Number type",
    "Undefined type",
    "Null type"
], question = [
    "Is this question true or false?",
    "True",
    "False"
]];

// function retrieves a random questions and creates buttons
// with answers on them
var usedQuestionIndex = []
function retrieveQuestion() {
    // grabs a random int relating to 1 question from the questions array
    do {
        var r = getRandomInt(0, questions.length)            
    } while(checkIndex(r, usedQuestionIndex))
    usedQuestionIndex.push(r)

    if(usedQuestionIndex.length == questions.length) endGame();

    // empties the question field and creates a new paragraph tag
    // with the question in it.
    questionEl.empty()
    questionEl.append('<p>')
    questionEl.children('p').text(questions[r][0])

    // function to check which array indexes have been used already
    var usedIndex = [];
    function checkIndex(randIndex, usedIndex) {
        for(var k=0;k<usedIndex.length;k++) {
            if(randIndex == usedIndex[k]) return true;
        }
        return false;
    }

    // loops through the selected question and creates buttons with the
    // true and false options on them.
    usedIndex = [];
    for (var i = 1; i<questions[r].length; i++) {
        //generates a new random array index if it has already been used
        do {
            var randIndex = getRandomInt(1, questions[r].length)            
        } while(checkIndex(randIndex, usedIndex))
        usedIndex.push(randIndex)

        questionEl.append("<div>");
        questionEl.append("<button>");
        questionEl.children('button').last().addClass('ansBtn');
        questionEl.children('button').last().attr('text', questions[r][randIndex]);
        questionEl.children('button').last().text(questions[r][randIndex]);
        questionEl.children('div').last().addClass('break')

        if(randIndex == 1) questionEl.children('button').last().attr('ans', true)
        else questionEl.children('button').last().attr('ans', false)
    }
}

// returns random int taken from mozilla developer documentation
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

// listens to clicks on answer buttons, returns true if correct
// otherwise false.
questionEl.on('click', '.ansBtn', function (event) {
    console.log($(event.target).attr('text'))
    if($(event.target).attr('ans') == 'true') correct(event.target)
    else incorrect(event.target);
    //retrieveQuestion();
})

// listener for the start button. starts the application.
goBtnEl.on('click', function () {
    goBtnEl.css("display", "none")
    highscoresEl.css('display', 'none')
    showHighscoresEl.css('display', 'none')
    retrieveQuestion();
    questionEl.css("display", "flex")
    time = setTime
    timer = setInterval(countdown, 1000);
    headerEl.children().css('display', 'none')
    timerEl.css('display', 'block')
    var tempTimer = '00:00'
    timerEl.text(tempTimer)   
})

// listener for the submit button after the game has ended
// records the users name and score
scoreEl.on('click', '.submit', function(event) {
    scoreEl.empty()
    var tempScore = [
        scoreEl.children().eq(4).text(),
        correctAnswers+" out of "+questions.length
]
    highscores.push(tempScore)
    scoreEl.css('display', 'none')
    goBtnEl.css('display', 'block')
    headerEl.children('h1').css('display', 'block')
    headerEl.children('h2').css('display', 'block')
    showHighscoresEl.css('display', 'block')
})

// listener for the show highscore button
// builds a <div> that will display the names and scores of previous users
var highSwitch = true
showHighscoresEl.on('click', function () {
    if(highSwitch == true) {
        highscoresEl.css('display', 'block')
        questionEl.css('display', 'none')
        scoreEl.css('display', 'none')
        goBtnEl.css('display', 'none')
        headerEl.children('h1').css('display', 'none')
        headerEl.children('h2').css('display', 'none')
        for(var i=0; i<highscores.length; i++) {
            highscoresEl.append('<h3>')
            highscoresEl.children().last().text(highscores[i][0]+" got "+highscores[i][1])
            highscoresEl.append('<div>')
            highscoresEl.children().last().addClass('break')
        }
        highSwitch = false;
        showHighscoresEl.text("Return")
    } else {
        goBtnEl.css('display', 'block')
        headerEl.children('h1').css('display', 'block')
        headerEl.children('h2').css('display', 'block')
        highscoresEl.empty()
        highscoresEl.css('display', 'none')
        highSwitch = true
        showHighscoresEl.text("Press here to view scores.")

    }
})

// countdown timer
// if it reaches 0 the game ends
var time = 0
function countdown() {
    var timer = ''
    time--
    var minutes = Math.floor(time/60)
    var hours = Math.floor(minutes/60)

    if (hours != 0) timer = timer + hours%60 + ":";
    if (minutes != 0) {
        if (minutes%60 < 10) timer = timer + "0" + minutes%60 + ":"
        else timer = timer + minutes%60 + ":";
    } else timer = timer + "0:";
    if (time%60 < 10) timer = timer + "0" + time%60
    else timer = timer + time%60
    timerEl.text(timer)
    if (time <= 0) endGame();
}

// this creates listens for a click on the entire screen
// in order to see the correct answer before continueing the quiz
fillEl.on('click', function () {
    fillEl.css('display', 'none')
    retrieveQuestion();
})

// this function ends the game
// it displays the score and provides a field for tha players name
function endGame() {
    questionEl.css('display', 'none');
    clearInterval(timer);
    fillEl.css('display', 'none')
    timerEl.css('display', 'none')
    highscoresEl.css('display', 'block')
    scoreEl.css('display', 'flex')
    scoreEl.append('<p>')
    scoreEl.children().last().text("congradulations you got "+correctAnswers+" out of "+questions.length)
    scoreEl.append('<div>')
    scoreEl.children().last().addClass('break')
    scoreEl.append('<p>')
    scoreEl.children().last().text("please input a name below to save your score")
    scoreEl.append('<div>')
    scoreEl.children().last().addClass('break')
    scoreEl.append('<input>')
    scoreEl.append('<div>')
    scoreEl.children().last().addClass('break')
    scoreEl.append('<button>')
    scoreEl.children().last().addClass('submit').text('Submit Score')
}

// executes when a qusetion is answerd correctly
// adds to the correct answers total and turns the button green
function correct(clicked) {
    $(clicked).css('background-color', 'green')
    correctAnswers++
    fillEl.css('display', 'block')
    numOfQuestions++
}

// executes when a question is answered incorrectly
// adds to the incorrect answers total, removes 5 seconds fromt the timer
// and turns the incorrect button red aswell as the correct button green
function incorrect(clicked) {
    $("[ans=true]").css('background-color', 'green')
    $(clicked).css('background-color', 'red')
    incorrectAnswers++
    time = time -5
    fillEl.css('display', 'block')
    numOfQuestions++
}