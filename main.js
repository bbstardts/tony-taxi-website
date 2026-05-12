let questions = [];
let timer;
let timeLeft = 15 * 60; // 15 minutes

// =======================
// START EXAM
// =======================
function startExam() {
    generateQuestions();
    renderQuestions();
    startTimer();
}

// =======================
// GENERATE RANDOM 30 QUESTIONS
// =======================
function generateQuestions() {
    questions = questionBank
        .sort(() => Math.random() - 0.5)
        .slice(0, 30);
}

// =======================
// RENDER QUESTIONS
// =======================
function renderQuestions() {
    const quiz = document.getElementById("quiz");
    quiz.innerHTML = "";

    questions.forEach((q, i) => {
        quiz.innerHTML += `
        <div class="question">
            <p><b>${i + 1}. ${q.q}</b></p>
            ${q.options.map((opt, j) => `
                <label>
                    <input type="radio" name="q${i}" value="${j}">
                    ${opt}
                </label>
            `).join("")}
        </div>
        `;
    });
}

// =======================
// TIMER SYSTEM
// =======================
function startTimer() {
    clearInterval(timer);

    timer = setInterval(() => {
        if (timeLeft <= 0) {
            submitExam();
            return;
        }

        timeLeft--;

        let min = Math.floor(timeLeft / 60);
        let sec = timeLeft % 60;

        document.getElementById("timer").innerText =
            `${min}:${sec < 10 ? "0" : ""}${sec}`;

    }, 1000);
}

// =======================
// SUBMIT EXAM
// =======================
function submitExam() {
    clearInterval(timer);

    let score = 0;
    let resultHTML = "";

    questions.forEach((q, i) => {
        let selected = document.querySelector(`input[name=q${i}]:checked`);

        if (selected && parseInt(selected.value) === q.answer) {
            score++;
            resultHTML += `<p class="correct">Q${i + 1}: Correct</p>`;
        } else {
            resultHTML += `<p class="wrong">Q${i + 1}: Wrong (Ans: ${q.options[q.answer]})</p>`;
        }
    });

    document.getElementById("result").innerHTML = `
        <h2>🎯 Final Score: ${score} / 30</h2>
        ${resultHTML}
    `;
}

// =======================
// RESTART EXAM
// =======================
function restartExam() {
    timeLeft = 15 * 60;
    document.getElementById("result").innerHTML = "";
    startExam();
}

// =======================
// BUTTON CONNECTION
// =======================
document.getElementById("submitBtn").addEventListener("click", submitExam);
document.getElementById("restartBtn").addEventListener("click", restartExam);

// =======================
// AUTO START
// =======================
startExam();