
var goBtnEl = $('#go')
var questionEl = $('#question')

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

function retrieveQuestion() {
    r = getRandomInt(0, questions.length)
    console.log(r)
    questionEl.empty()
    questionEl.append('<p>')
    questionEl.children('p').text(questions[r][0])
    for (var i = 1; i<questions[r].length; i++) {
        questionEl.append("<div>");
        questionEl.append("<button>");
        questionEl.children('button').last().addClass('ansBtn');
        questionEl.children('button').last().attr('text', questions[r][i]);
        questionEl.children('button').last().text(questions[r][i]);
        questionEl.children('div').last().addClass('break')
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

questionEl.on('click', '.ansBtn', function (event) {
    var text = event.target;
    console.log($(event.target).attr('text'))
    retrieveQuestion();
})

goBtnEl.on('click', function () {
    goBtnEl.css("display", "none")
    retrieveQuestion();
    questionEl.css("display", "flex")
})