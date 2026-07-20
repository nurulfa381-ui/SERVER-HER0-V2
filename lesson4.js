// ======================================
// SERVER HERO V2
// LESSON 4
// CONFIGURE DNS SERVER
// ======================================

// Progress
const progressBar = document.getElementById("missionProgress");
const progressText = document.getElementById("progressText");

// Result
const resultBox = document.getElementById("result");

// Complete Button
const completeBtn = document.getElementById("completeBtn");

// Mission Status
let progress = 0;
let answered = false;

// ======================================
// LOAD SAVE
// ======================================

window.onload = function () {

    if (localStorage.getItem("lesson4Complete") === "true") {

        progress = 100;

        progressBar.value = 100;

        progressText.textContent = "100%";

        resultBox.className = "result success";

        resultBox.innerHTML = `
            ✅ Mission Already Completed
            <br><br>
            +800 XP Earned
        `;

        completeBtn.disabled = true;

        completeBtn.textContent = "Completed";

    }

};

// ======================================
// QUIZ
// ======================================

function answer(correct) {

    if (answered) return;

    answered = true;

    // Disable all buttons after selecting an answer
    const buttons = document.querySelectorAll(".quiz button");

    buttons.forEach(btn => {
        btn.disabled = true;
    });

    if (correct) {

        progress = 100;

        progressBar.value = progress;

        progressText.textContent = "100%";

        resultBox.className = "result success";

        resultBox.innerHTML = `
            ✅ Correct Answer!
            <br><br>
            🎉 +800 XP
            <br><br>
            Mission Ready To Complete
        `;

        completeBtn.disabled = false;

    } else {

        resultBox.className = "result fail";

        resultBox.innerHTML = `
            ❌ Wrong Answer
            <br><br>
            Please refresh the page and try again.
        `;

    }

}

// ======================================
// COMPLETE MISSION
// ======================================

function completeMission() {

    localStorage.setItem("lesson4Complete", "true");

    alert("🎉 Congratulations!\n\nMission 4 Completed!\n\n+800 XP\n\nLesson 5 Unlocked.");

    window.location.href = "index.html";

}

// ======================================
// DEBUG
// ======================================

console.log("Lesson 4 Loaded Successfully");