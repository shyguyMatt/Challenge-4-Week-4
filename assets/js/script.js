
var goBtnEl = $('#go')
var questionEl = $('#question')

var questions = [question = {
    question: "This is the question 1",
    answer: "This is the answer",
    false: "This is the wrong answer",
    false2: "This is the wrong answer",
    false3: "This is the wrong answer"
}, question = {
    question: "This is the question 2",
    answer: "This is the answer",
    false: "This is the wrong answer",
    false2: "This is the wrong answer",
    false3: "This is the wrong answer"
}];

goBtnEl.on('click', function () {
    goBtnEl.css("display", "none")
    questionEl.css("display", "flex")
})