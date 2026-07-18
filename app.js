const missions = document.querySelectorAll(".mission");
const xpDisplay = document.getElementById("xp");
const progressBar = document.getElementById("progress");
const percentDisplay = document.getElementById("percent");

let xp = 500;
let completed = 0;

missions.forEach((mission, index) => {

    const button = mission.querySelector("button");

    button.addEventListener("click", () => {

        if (button.disabled) return;

        // tambah XP
        xp += 100;
        xpDisplay.textContent = xp;

        // siap misi
        mission.classList.add("completed");
        button.textContent = "Completed";
        button.disabled = true;

        completed++;

        // progress
        const percent = Math.round((completed / missions.length) * 100);

        progressBar.value = percent;
        percentDisplay.textContent = percent + "%";

        // unlock mission seterusnya
        const nextMission = missions[index + 1];

        if (nextMission) {

            nextMission.classList.remove("locked");

            const nextButton = nextMission.querySelector("button");

            nextButton.disabled = false;

            nextButton.textContent = "Start Mission";

        }

    });

});
