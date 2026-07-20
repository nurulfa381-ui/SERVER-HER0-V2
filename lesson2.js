const completeBtn = document.getElementById("completeBtn");

completeBtn.addEventListener("click", () => {

    localStorage.setItem("lesson2Complete", "true");

    alert("🎉 Mission Complete!\n\n+600 XP\nMission 3 Unlocked!");

    window.location.href = "index.html";

});