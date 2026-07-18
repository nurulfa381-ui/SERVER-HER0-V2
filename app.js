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
