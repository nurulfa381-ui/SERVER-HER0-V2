const missionsContainer = document.getElementById("missions");

missions.forEach((mission) => {

    const card = document.createElement("div");

    card.className = `mission ${mission.status}`;

    card.innerHTML = `
        <h2>${mission.title}</h2>

        <p>${mission.description}</p>

        <p><strong>XP:</strong> ${mission.xp}</p>

        <button ${mission.status === "locked" ? "disabled" : ""}>
            ${mission.status === "available" ? "Start Mission" : "Locked"}
        </button>
    `;

    missionsContainer.appendChild(card);

});

const missionCards = document.querySelectorAll(".mission");
const xpDisplay = document.getElementById("xp");
const percentDisplay = document.getElementById("percent");

let xp = 500;
let completed = 0;

missionCards.forEach((mission, index) => {

    const button = mission.querySelector("button");

    button.addEventListener("click", () => {

        if (button.disabled) return;

        xp += 100;
        xpDisplay.textContent = xp;

        mission.classList.add("completed");

        button.textContent = "Completed";

        button.disabled = true;

        completed++;

        const percent = Math.round((completed / missionCards.length) * 100);

        percentDisplay.textContent = percent + "%";

        const progressFill = document.getElementById("progress-fill");

        if(progressFill){
            progressFill.style.width = percent + "%";
        }

        const nextMission = missionCards[index + 1];

        if(nextMission){

            nextMission.classList.remove("locked");

            const nextButton = nextMission.querySelector("button");

            nextButton.disabled = false;

            nextButton.textContent = "Start Mission";

        }

    });

});
