const questions = [
    {
        'quz': 'which of the following is a markup language ?',
        'a': 'html',
        'b': 'javascript',
        'c': 'css',
        'd': 'php',
        'correct': 'a',
        'userAnswer': null // Store user's answer
    },
    {
        'quz': 'What are the types of lists available in HTML?',
        'a': 'Bulleted, Numbered Lists.',
        'b': 'Named, Unnamed Lists.',
        'c': 'Ordered, Unordered Lists.',
        'd': 'None of the above.',
        'correct': 'c',
        'userAnswer': null // Store user's answer
    },
    {
        'quz': 'How to create an ordered list in HTML?',
        'a': 'ul',
        'b': 'ol',
        'c': 'href',
        'd': 'b',
        'correct': 'b',
        'userAnswer': null

    }, {
        'quz': 'HTML files are saved by default with the extension?',
        'a': '.html',
        'b': '.htp',
        'c': '.ht',
        'd': 'none of the above',
        'correct': 'a',
        'userAnswer': null
    },
    {
        'quz': 'What is the effect of the <b> tag?',
        'a': 'It converts the text within it to bold font.',
        'b': 'It is used to write black-colored font.',
        'c': 'It is used to change the font size.',
        'd': 'none of the above',
        'correct': 'a',
        'userAnswer': null
    },



    // Add more questions here...
];

let index = 0;
let total = questions.length;
let right = 0, wrong = 0;
let question = document.getElementById("question");
let optionInput = document.querySelectorAll(".option");
let previous = document.getElementById("prve");

const loadquestion = () => {
    if (index === total) {
        return endQuize();
    }
    reset();
    const data = questions[index];
    console.log(index);
    question.innerHTML = `${index + 1}) ${data.quz}`;
    optionInput[0].nextElementSibling.innerHTML = data.a;
    optionInput[1].nextElementSibling.innerHTML = data.b;
    optionInput[2].nextElementSibling.innerHTML = data.c;
    optionInput[3].nextElementSibling.innerHTML = data.d;

    if (index > 0) {
        // Show the previous button if it's not the first question
        previous.style.display = "block";
    } else {
        // Hide the previous button if it's the first question
        previous.style.display = "none";
    }
    // Check if user has previously selected an answer for this question
    if (data.userAnswer !== null) {
        optionInput.forEach((input) => {
            if (input.value === data.userAnswer) {
                input.checked = true;
            }
        });
    }
};

let submitQuize = document.getElementById("submit-quize");

submitQuize.addEventListener("click", () => {
    let ans = getAnswer();
    const data = questions[index];
    console.log(ans, data.correct);
    data.userAnswer = ans; // Store user's answer

    if (ans === data.correct) {
        right++;
    } else {
        wrong++;
    }
    index++;
    loadquestion();
    return;
});

previous.addEventListener("click", () => {
    let ans = getAnswer();
    const data = questions[index];

    data.userAnswer = ans; // Store user's answer

    if (ans === data.correct) {
        right++;
    } else {
        wrong++;
    }

    index--;
    if (index < 0) {
        index = 0; // Ensure index doesn't go below 0
    }
    loadquestion();
    return;
});

function getAnswer() {
    let answer;
    optionInput.forEach((input) => {
        if (input.checked) {
            answer = input.value;
        }
    });
    return answer;
}

function reset() {
    optionInput.forEach((input) => {
        input.checked = false;
    });
}

function endQuize() {
    let quiz = document.querySelector(".quiz");
    quiz.style.display = "none";
    let answerBtn = document.querySelector(".answer-btn");
    answerBtn.style.display = "none";
    let res = document.querySelector("h1");
    res.innerHTML = `<h1>thank you for  playing the quize<h1>    <br> <h2>${right}/${total} are correct`;
}

loadquestion();
