
var goBtnEl = $('#go')
var questionEl = $('#question')

// array of questions along with their answers
var questions = [question = [
    "This is the question 1",
    "This is the answer",
    "This is the wrong answer",
    "This is the wrong answer",
    "This is the wrong answer"
], question = [
    "This is the question 2",
    "This is the answer",
    "This is the wrong answer",
    "This is the wrong answer",
    "This is the wrong answer"
], question = [
    "This is the question 3",
    "This is the answer",
    "This is the wrong answer",
    "This is the wrong answer",
    "This is the wrong answer"
], question = [
    "This is the question 4",
    "This is the answer",
    "This is the wrong answer",
    "This is the wrong answer",
    "This is the wrong answer"
], question = [
    "This is the question 5",
    "This is the answer",
    "This is the wrong answer",
    "This is the wrong answer",
    "This is the wrong answer"
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
    var text = event.target;
    console.log($(event.target).attr('text'))
    if($(event.target).attr('ans') == true) console.log('correct')
    else console.log('incorrect')
    retrieveQuestion();
})


// listener for the start button. starts the application.
goBtnEl.on('click', function () {
    goBtnEl.css("display", "none")
    retrieveQuestion();
    questionEl.css("display", "flex")
})