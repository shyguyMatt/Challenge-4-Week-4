
var goBtnEl = $('#go')
var questionEl = $('#question')
var headerEl = $('header')
var timerEl = $('#timer')
var fillEl = $('#fill')
var timer
var correctAnswers = 0;
var incorrectAnswers = 0;
var time = 120 // in seconds

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
function retrieveQuestion() {
    // grabs a random int relating to 1 question from the questions array
    r = getRandomInt(0, questions.length)

    // empties the question field and creates a new paragraph tag
    // with the question in it.
    questionEl.empty()
    questionEl.append('<p>')
    questionEl.children('p').text(questions[r][0])

    // function to check which array indexes have been used already
    var usedIndex = [];
    function checkIndex(randIndex) {
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
        } while(checkIndex(randIndex))
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
    retrieveQuestion();
    questionEl.css("display", "flex")
    timer = setInterval(countdown, 1000);
    headerEl.children().css('display', 'none')
    timerEl.css('display', 'block')
    var tempTimer = '00:00'
    timerEl.text(tempTimer)   
})

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

fillEl.on('click', function () {
    fillEl.css('display', 'none')
    retrieveQuestion();
})

function endGame() {
    questionEl.empty();
    clearInterval(timer);
}
function correct(clicked) {
    $(clicked).css('background-color', 'green')
    correctAnswers++
    fillEl.css('display', 'block')
}
function incorrect(clicked) {
    $("[ans=true]").css('background-color', 'green')
    $(clicked).css('background-color', 'red')
    incorrectAnswers++
    time = time -5
    fillEl.css('display', 'block')
}