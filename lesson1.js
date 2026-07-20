// ==========================================
// SERVER HERO PREMIUM
// lesson1.js
// PART 1
// ==========================================

// ==========================================
// LESSON CONFIGURATION
// ==========================================

const LESSON_ID = 1;

const LESSON_REWARD = {

    xp: 250,

    coins: 50,

    gems: 2

};


// ==========================================
// DOM
// ==========================================

const progressBar = document.getElementById("missionProgress");

const progressText = document.getElementById("progressText");

const resultBox = document.getElementById("result");

const completeButton = document.getElementById("completeBtn");

const quizButtons = document.querySelectorAll(".quiz button");


// ==========================================
// STATE
// ==========================================

let missionProgress = 0;

let quizCompleted = false;

let lessonCompleted = false;


// ==========================================
// LOAD SAVE
// ==========================================

function loadLesson(){

    lessonCompleted =

        localStorage.getItem(

            `lesson${LESSON_ID}Complete`

        ) === "true";

    if(lessonCompleted){

        missionProgress = 100;

        updateProgress();

        completeButton.disabled = true;

        completeButton.innerHTML =

            "Mission Completed";

    }

}


// ==========================================
// UPDATE PROGRESS
// ==========================================

function updateProgress(){

    if(progressBar){

        progressBar.value = missionProgress;

    }

    if(progressText){

        progressText.textContent =

            missionProgress + "%";

    }

}


// ==========================================
// ANIMATE PROGRESS
// ==========================================

function animateProgress(target){

    const timer = setInterval(()=>{

        if(missionProgress >= target){

            clearInterval(timer);

            return;

        }

        missionProgress++;

        updateProgress();

    },20);

}


// ==========================================
// SHOW RESULT
// ==========================================

function showResult(message,type){

    resultBox.className =

        "result " + type;

    resultBox.innerHTML = message;

}


// ==========================================
// QUIZ ENGINE
// ==========================================

window.answer = function(correct){

    if(quizCompleted) return;

    quizButtons.forEach(button=>{

        button.disabled = true;

    });

    if(correct){

        quizCompleted = true;

        animateProgress(80);

        showResult(

            "✅ Correct! Mission almost complete.",

            "correct"

        );

        completeButton.disabled = false;

    }

    else{

        animateProgress(25);

        showResult(

            "❌ Incorrect. Review the lesson and try again.",

            "wrong"

        );

        setTimeout(()=>{

            location.reload();

        },1800);

    }

};


// ==========================================
// INITIALIZE
// ==========================================

loadLesson();

updateProgress();

// ==========================================
// lesson1.js
// PART 2 (FINAL)
// ==========================================


// ==========================================
// COMPLETE MISSION
// ==========================================

window.completeMission = function () {

    if (lessonCompleted) {

        return;

    }

    lessonCompleted = true;

    animateProgress(100);

    localStorage.setItem(

        `lesson${LESSON_ID}Complete`,

        "true"

    );

    localStorage.setItem(

        "lesson2Unlocked",

        "true"

    );

    updatePlayerReward();

    showRewardPopup();

};


// ==========================================
// UPDATE PLAYER
// ==========================================

function updatePlayerReward() {

    let player = JSON.parse(

        localStorage.getItem(

            "serverHeroPlayer"

        )

    );

    if (!player) {

        player = {

            level: 1,

            xp: 500,

            coins: 100,

            gems: 10,

            completed: 0,

            streak: 1,

            rank: "Beginner"

        };

    }

    player.xp += LESSON_REWARD.xp;

    player.coins += LESSON_REWARD.coins;

    player.gems += LESSON_REWARD.gems;

    player.completed++;

    localStorage.setItem(

        "serverHeroPlayer",

        JSON.stringify(player)

    );

}


// ==========================================
// REWARD POPUP
// ==========================================

function showRewardPopup() {

    const popup = document.createElement("div");

    popup.className = "reward-popup";

    popup.innerHTML = `

        <h2>🎉 Mission Completed</h2>

        <p>+${LESSON_REWARD.xp} XP</p>

        <p>+${LESSON_REWARD.coins} Coins</p>

        <p>+${LESSON_REWARD.gems} Gems</p>

        <br>

        <button id="continueBtn">

            Continue

        </button>

    `;

    document.body.appendChild(popup);

    setTimeout(() => {

        popup.classList.add("show");

    }, 100);

    document

        .getElementById("continueBtn")

        .addEventListener("click", () => {

            popup.remove();

            window.location.href = "index.html";

        });

}


// ==========================================
// KEYBOARD SHORTCUT
// ==========================================

document.addEventListener(

    "keydown",

    function (event) {

        if (

            event.key === "Enter" &&

            !completeButton.disabled

        ) {

            completeMission();

        }

    }

);


// ==========================================
// PREVENT MULTIPLE CLICK
// ==========================================

completeButton.addEventListener(

    "click",

    function () {

        completeButton.disabled = true;

    }

);


// ==========================================
// LESSON READY
// ==========================================

console.log("================================");
console.log("SERVER HERO PREMIUM");
console.log("Lesson 01 Ready");
console.log("Mission :", LESSON_ID);
console.log("Reward XP :", LESSON_REWARD.xp);
console.log("================================");