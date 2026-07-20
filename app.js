// =======================================
// SERVER HERO PREMIUM
// app.js
// PART 1
// =======================================

// =======================================
// PLAYER PROFILE
// =======================================

const PLAYER = {

    level: 1,

    xp: 500,

    coins: 100,

    gems: 10,

    completed: 0,

    streak: 1,

    rank: "Beginner",

    totalMission: missions.length

};

// =======================================
// DOM
// =======================================

const missionsContainer = document.getElementById("missions");

const xpDisplay = document.getElementById("xp");

const progress = document.getElementById("progress");

const percentDisplay = document.getElementById("percent");

const levelDisplay = document.getElementById("level");

const coinDisplay = document.getElementById("coins");

const gemDisplay = document.getElementById("gems");

const rankDisplay = document.getElementById("rank");


// =======================================
// SAVE / LOAD
// =======================================

function loadPlayer(){

    const save = JSON.parse(localStorage.getItem("serverHeroPlayer"));

    if(save){

        PLAYER.level = save.level;

        PLAYER.xp = save.xp;

        PLAYER.coins = save.coins;

        PLAYER.gems = save.gems;

        PLAYER.completed = save.completed;

        PLAYER.streak = save.streak;

        PLAYER.rank = save.rank;

    }

}

function savePlayer(){

    localStorage.setItem(

        "serverHeroPlayer",

        JSON.stringify(PLAYER)

    );

}


// =======================================
// CREATE CARD
// =======================================

missions.forEach((mission,index)=>{

    const card = document.createElement("div");

    card.className="mission-card";

    if(mission.status==="locked"){

        card.classList.add("locked");

    }

    card.innerHTML=`

        <div class="mission-header">

            <h2>${mission.title}</h2>

            <span class="badge">${mission.xp} XP</span>

        </div>

        <p>${mission.description}</p>

        <div class="mission-footer">

            <button>

                ${mission.status==="locked"

                    ? "Locked"

                    : "Start Mission"}

            </button>

        </div>

    `;

    missionsContainer.appendChild(card);

});


// =======================================
// LOAD COMPLETION
// =======================================

missions.forEach((mission,index)=>{

    if(localStorage.getItem(`lesson${index+1}Complete`)==="true"){

        PLAYER.completed++;

        PLAYER.xp+=mission.xp;

    }

});


// =======================================
// PLAYER RANK
// =======================================

function calculateRank(){

    if(PLAYER.xp>=9000){

        PLAYER.rank="Legend";

    }

    else if(PLAYER.xp>=7000){

        PLAYER.rank="Master";

    }

    else if(PLAYER.xp>=5000){

        PLAYER.rank="Elite";

    }

    else if(PLAYER.xp>=3500){

        PLAYER.rank="Expert";

    }

    else if(PLAYER.xp>=2200){

        PLAYER.rank="Professional";

    }

    else if(PLAYER.xp>=1200){

        PLAYER.rank="Advanced";

    }

    else{

        PLAYER.rank="Beginner";

    }

}


// =======================================
// PLAYER LEVEL
// =======================================

function calculateLevel(){

    PLAYER.level=Math.floor(PLAYER.xp/500);

    if(PLAYER.level<1){

        PLAYER.level=1;

    }

}


// =======================================
// UPDATE DASHBOARD
// =======================================

function updateDashboard(){

    calculateLevel();

    calculateRank();

    if(xpDisplay){

        xpDisplay.textContent=PLAYER.xp;

    }

    if(levelDisplay){

        levelDisplay.textContent=PLAYER.level;

    }

    if(rankDisplay){

        rankDisplay.textContent=PLAYER.rank;

    }

    if(coinDisplay){

        coinDisplay.textContent=PLAYER.coins;

    }

    if(gemDisplay){

        gemDisplay.textContent=PLAYER.gems;

    }

    const percent=Math.round(

        (PLAYER.completed/PLAYER.totalMission)*100

    );

    if(progress){

        progress.value=percent;

    }

    if(percentDisplay){

        percentDisplay.textContent=percent+"%";

    }

    savePlayer();

}


// =======================================
// LOAD PLAYER
// =======================================

loadPlayer();

updateDashboard();

// =======================================
// PART 2
// MISSION ENGINE
// =======================================

const missionCards = document.querySelectorAll(".mission-card");

missionCards.forEach((card, index) => {

    const button = card.querySelector("button");

    const completed =
        localStorage.getItem(`lesson${index + 1}Complete`) === "true";

    const unlocked =
        index === 0 ||
        localStorage.getItem(`lesson${index}Complete`) === "true";


    // --------------------------
    // LOCKED
    // --------------------------

    if (!unlocked) {

        card.classList.add("locked");

        button.disabled = true;

        button.textContent = "Locked";

    }


    // --------------------------
    // AVAILABLE
    // --------------------------

    if (unlocked && !completed) {

        card.classList.remove("locked");

        button.disabled = false;

        button.textContent = "Start Mission";

    }


    // --------------------------
    // COMPLETED
    // --------------------------

    if (completed) {

        card.classList.remove("locked");

        card.classList.add("completed");

        button.disabled = true;

        button.textContent = "Completed";

    }


    // --------------------------
    // OPEN LESSON
    // --------------------------

    button.addEventListener("click", () => {

        if (button.disabled) return;

        window.location.href = `lesson${index + 1}.html`;

    });

});


// =======================================
// COMPLETE MISSION
// =======================================

function completeMission(id, rewardXP = 100) {

    if (localStorage.getItem(`lesson${id}Complete`) === "true") {

        return;

    }

    localStorage.setItem(`lesson${id}Complete`, "true");

    PLAYER.completed++;

    PLAYER.xp += rewardXP;

    PLAYER.coins += 50;

    PLAYER.gems += 2;

    PLAYER.streak++;

    savePlayer();

    updateDashboard();

    showReward(rewardXP);

}


// =======================================
// REWARD POPUP
// =======================================

function showReward(rewardXP) {

    const popup = document.createElement("div");

    popup.className = "reward-popup";

    popup.innerHTML = `

        <h2>🎉 Mission Completed!</h2>

        <p>+${rewardXP} XP</p>

        <p>+50 Coins</p>

        <p>+2 Gems</p>

    `;

    document.body.appendChild(popup);

    setTimeout(() => {

        popup.classList.add("show");

    }, 100);

    setTimeout(() => {

        popup.classList.remove("show");

    }, 2500);

    setTimeout(() => {

        popup.remove();

        location.reload();

    }, 3200);

}


// =======================================
// LESSON PAGE SUPPORT
// =======================================

window.completeMission = function () {

    const page = location.pathname
        .split("/")
        .pop()
        .replace(".html", "");

    const lessonNumber = parseInt(

        page.replace("lesson", "")

    );

    completeMission(lessonNumber, 250);

};


// =======================================
// QUIZ ENGINE
// =======================================

window.answer = function(correct){

    const result = document.getElementById("result");

    const button = document.getElementById("completeBtn");

    if(correct){

        result.innerHTML="✅ Correct Answer!";

        result.className="result correct";

        if(button){

            button.disabled=false;

        }

    }

    else{

        result.innerHTML="❌ Incorrect. Try Again.";

        result.className="result wrong";

    }

};

// =======================================
// PART 3
// ACHIEVEMENT • LEVEL • DAILY BONUS
// =======================================

// =======================================
// ACHIEVEMENTS
// =======================================

const achievements = [

    {
        id: 1,
        title: "First Mission",
        target: 1,
        reward: 100,
        unlocked: false
    },

    {
        id: 2,
        title: "Explorer",
        target: 3,
        reward: 300,
        unlocked: false
    },

    {
        id: 3,
        title: "Server Administrator",
        target: 5,
        reward: 500,
        unlocked: false
    },

    {
        id: 4,
        title: "Network Specialist",
        target: 8,
        reward: 800,
        unlocked: false
    }

];


// =======================================
// LOAD ACHIEVEMENT
// =======================================

function loadAchievements(){

    const save = JSON.parse(

        localStorage.getItem("serverHeroAchievement")

    );

    if(save){

        save.forEach((item,index)=>{

            if(achievements[index]){

                achievements[index].unlocked=item.unlocked;

            }

        });

    }

}


// =======================================
// SAVE ACHIEVEMENT
// =======================================

function saveAchievements(){

    localStorage.setItem(

        "serverHeroAchievement",

        JSON.stringify(achievements)

    );

}


// =======================================
// CHECK ACHIEVEMENT
// =======================================

function checkAchievements(){

    achievements.forEach(item=>{

        if(

            PLAYER.completed>=item.target &&

            item.unlocked===false

        ){

            item.unlocked=true;

            PLAYER.xp+=item.reward;
            PLAYER.coins+=100;

            showAchievement(item);

        }

    });

    saveAchievements();

}


// =======================================
// ACHIEVEMENT POPUP
// =======================================

function showAchievement(item){

    const popup=document.createElement("div");

    popup.className="achievement-popup";

    popup.innerHTML=`

        <h2>🏆 Achievement Unlocked</h2>

        <h3>${item.title}</h3>

        <p>+${item.reward} XP</p>

        <p>+100 Coins</p>

    `;

    document.body.appendChild(popup);

    setTimeout(()=>{

        popup.classList.add("show");

    },100);

    setTimeout(()=>{

        popup.classList.remove("show");

    },3500);

    setTimeout(()=>{

        popup.remove();

    },4200);

}


// =======================================
// LEVEL UP
// =======================================

function checkLevelUp(){

    const previousLevel=PLAYER.level;

    calculateLevel();

    if(PLAYER.level>previousLevel){

        levelUpAnimation();

    }

}


// =======================================
// LEVEL ANIMATION
// =======================================

function levelUpAnimation(){

    const level=document.createElement("div");

    level.className="level-up";

    level.innerHTML=`

        <h1>⭐ LEVEL UP ⭐</h1>

        <h2>Level ${PLAYER.level}</h2>

    `;

    document.body.appendChild(level);

    setTimeout(()=>{

        level.classList.add("show");

    },100);

    setTimeout(()=>{

        level.classList.remove("show");

    },2500);

    setTimeout(()=>{

        level.remove();

    },3200);

}


// =======================================
// DAILY BONUS
// =======================================

function dailyBonus(){

    const today=new Date().toDateString();

    const last=localStorage.getItem("dailyBonus");

    if(last!==today){

        PLAYER.coins+=25;

        PLAYER.gems+=1;

        PLAYER.xp+=50;

        localStorage.setItem(

            "dailyBonus",

            today

        );

        showDailyBonus();

    }

}


// =======================================
// DAILY BONUS POPUP
// =======================================

function showDailyBonus(){

    const bonus=document.createElement("div");

    bonus.className="daily-popup";

    bonus.innerHTML=`

        <h2>🎁 Daily Login Bonus</h2>

        <p>+50 XP</p>

        <p>+25 Coins</p>

        <p>+1 Gem</p>

    `;

    document.body.appendChild(bonus);

    setTimeout(()=>{

        bonus.classList.add("show");

    },100);

    setTimeout(()=>{

        bonus.classList.remove("show");

    },3000);

    setTimeout(()=>{

        bonus.remove();

    },3600);

}


// =======================================
// AUTO SAVE
// =======================================

function autoSave(){

    savePlayer();

    saveAchievements();

}


// =======================================
// INITIALIZE PREMIUM ENGINE
// =======================================

loadAchievements();

dailyBonus();

checkAchievements();

checkLevelUp();

updateDashboard();

setInterval(autoSave,5000);

// =======================================
// PART 4
// PREMIUM EFFECT ENGINE
// =======================================


// =======================================
// SOUND ENGINE
// =======================================

const sounds = {

    click: new Audio("assets/audio/click.mp3"),

    success: new Audio("assets/audio/success.mp3"),

    levelup: new Audio("assets/audio/levelup.mp3"),

    reward: new Audio("assets/audio/reward.mp3"),

    error: new Audio("assets/audio/error.mp3")

};

Object.values(sounds).forEach(sound => {

    sound.preload = "auto";

    sound.volume = 0.6;

});

function playSound(name){

    if(!sounds[name]) return;

    try{

        sounds[name].currentTime = 0;

        sounds[name].play();

    }

    catch(e){

        console.log("Audio blocked by browser.");

    }

}


// =======================================
// BUTTON EFFECT
// =======================================

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("click",()=>{

        playSound("click");

    });

});


// =======================================
// TOAST NOTIFICATION
// =======================================

function showToast(message,type="info"){

    const toast=document.createElement("div");

    toast.className=`toast ${type}`;

    toast.innerHTML=message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

    setTimeout(()=>{

        toast.remove();

    },3600);

}


// =======================================
// PARTICLE EFFECT
// =======================================

function createParticles(){

    for(let i=0;i<25;i++){

        const particle=document.createElement("span");

        particle.className="particle";

        particle.style.left=Math.random()*100+"vw";

        particle.style.animationDuration=

            (Math.random()*3+2)+"s";

        particle.style.opacity=Math.random();

        particle.style.transform=

            `scale(${Math.random()+0.3})`;

        document.body.appendChild(particle);

        setTimeout(()=>{

            particle.remove();

        },5000);

    }

}


// =======================================
// REWARD EFFECT
// =======================================

function rewardAnimation(){

    createParticles();

    playSound("reward");

    showToast("🎉 Reward Collected!","success");

}


// =======================================
// LEVEL UP EFFECT
// =======================================

const originalLevelUp = levelUpAnimation;

levelUpAnimation = function(){

    playSound("levelup");

    createParticles();

    showToast("⭐ Level Up!","success");

    originalLevelUp();

};


// =======================================
// COMPLETE EFFECT
// =======================================

const originalCompleteMission = completeMission;

completeMission = function(id,rewardXP=100){

    originalCompleteMission(id,rewardXP);

    rewardAnimation();

};


// =======================================
// ACHIEVEMENT EFFECT
// =======================================

const originalAchievement = showAchievement;

showAchievement=function(item){

    playSound("success");

    createParticles();

    showToast(

        "🏆 "+item.title+" Unlocked",

        "success"

    );

    originalAchievement(item);

};


// =======================================
// SAVE BACKUP
// =======================================

function backupSave(){

    const backup={

        player:PLAYER,

        achievements:achievements,

        date:new Date().toLocaleString()

    };

    localStorage.setItem(

        "serverHeroBackup",

        JSON.stringify(backup)

    );

}

setInterval(backupSave,60000);


// =======================================
// PLAYER STATISTICS
// =======================================

const statistics={

    login:0,

    missionStart:0,

    missionComplete:PLAYER.completed,

    totalXP:PLAYER.xp

};

function saveStatistics(){

    localStorage.setItem(

        "serverHeroStatistics",

        JSON.stringify(statistics)

    );

}

statistics.login++;

saveStatistics();


// =======================================
// DASHBOARD WELCOME
// =======================================

window.addEventListener("load",()=>{

    setTimeout(()=>{

        showToast(

            "👋 Welcome back, Agent!",

            "info"

        );

    },600);

});


// =======================================
// PREMIUM LOADED
// =======================================

console.log("================================");

console.log("SERVER HERO PREMIUM");

console.log("Premium Effect Engine Loaded");

console.log("Player :",PLAYER);

console.log("================================")

// =======================================
// PART 5
// PREMIUM SYSTEM ENGINE
// =======================================


// =======================================
// MEDAL SYSTEM
// =======================================

const medals = [

    {
        id: 1,
        title: "Bronze Agent",
        xp: 1000,
        reward: 100
    },

    {
        id: 2,
        title: "Silver Agent",
        xp: 3000,
        reward: 300
    },

    {
        id: 3,
        title: "Gold Agent",
        xp: 6000,
        reward: 600
    },

    {
        id: 4,
        title: "Platinum Agent",
        xp: 10000,
        reward: 1000
    }

];


// =======================================
// CHECK MEDAL
// =======================================

function checkMedals(){

    let unlocked = JSON.parse(

        localStorage.getItem("serverHeroMedals")

    ) || [];

    medals.forEach(medal=>{

        if(

            PLAYER.xp>=medal.xp &&

            !unlocked.includes(medal.id)

        ){

            unlocked.push(medal.id);

            PLAYER.coins+=medal.reward;

            showToast(

                `🥇 ${medal.title} Unlocked`,

                "success"

            );

        }

    });

    localStorage.setItem(

        "serverHeroMedals",

        JSON.stringify(unlocked)

    );

}


// =======================================
// DAILY CHALLENGE
// =======================================

const dailyChallenges=[

    "Complete 1 Mission",

    "Earn 300 XP",

    "Login Today",

    "Finish Quiz",

    "Unlock New Lesson"

];

function loadDailyChallenge(){

    const today=new Date().getDate();

    const challenge=

        dailyChallenges[

            today%dailyChallenges.length

        ];

    localStorage.setItem(

        "dailyChallenge",

        challenge

    );

    console.log("Today's Challenge :",challenge);

}


// =======================================
// MISSION HISTORY
// =======================================

function addMissionHistory(name){

    let history=

        JSON.parse(

            localStorage.getItem("missionHistory")

        )||[];

    history.unshift({

        mission:name,

        date:new Date().toLocaleString()

    });

    if(history.length>20){

        history.pop();

    }

    localStorage.setItem(

        "missionHistory",

        JSON.stringify(history)

    );

}


// =======================================
// SHOP ENGINE
// =======================================

const shop=[

    {

        id:1,

        item:"Extra Life",

        price:100

    },

    {

        id:2,

        item:"Double XP",

        price:500

    },

    {

        id:3,

        item:"Golden Badge",

        price:1000

    }

];

function buyItem(id){

    const item=shop.find(

        x=>x.id===id

    );

    if(!item)return;

    if(PLAYER.coins<item.price){

        showToast(

            "❌ Not Enough Coins",

            "error"

        );

        return;

    }

    PLAYER.coins-=item.price;

    savePlayer();

    updateDashboard();

    showToast(

        `🛒 Purchased ${item.item}`,

        "success"

    );

}


// =======================================
// EXPORT SAVE
// =======================================

function exportSave(){

    const save={

        player:PLAYER,

        achievement:achievements,

        statistics:statistics,

        history:JSON.parse(

            localStorage.getItem(

                "missionHistory"

            )

        )||[]

    };

    localStorage.setItem(

        "exportSave",

        JSON.stringify(save)

    );

    showToast(

        "💾 Save Exported",

        "success"

    );

}


// =======================================
// IMPORT SAVE
// =======================================

function importSave(){

    const save=JSON.parse(

        localStorage.getItem(

            "exportSave"

        )

    );

    if(!save){

        showToast(

            "No Save Found",

            "error"

        );

        return;

    }

    Object.assign(

        PLAYER,

        save.player

    );

    savePlayer();

    updateDashboard();

    showToast(

        "✅ Save Imported",

        "success"

    );

}


// =======================================
// PLAYER REPORT
// =======================================

function showPlayerReport(){

    console.table({

        Level:PLAYER.level,

        XP:PLAYER.xp,

        Coins:PLAYER.coins,

        Gems:PLAYER.gems,

        Rank:PLAYER.rank,

        Completed:PLAYER.completed,

        Streak:PLAYER.streak

    });

}


// =======================================
// AUTO SYSTEM
// =======================================

checkMedals();

loadDailyChallenge();

showPlayerReport();

setInterval(exportSave,300000);


// =======================================
// GLOBAL FUNCTIONS
// =======================================

window.buyItem=buyItem;
window.exportSave=exportSave;
window.importSave=importSave;

console.log("Premium System Engine Loaded.");

// =======================================
// PART 6
// FINAL ENGINE
// SERVER HERO PREMIUM V2.1
// =======================================


// =======================================
// PERFORMANCE MONITOR
// =======================================

const PerformanceEngine = {

    fps: 60,

    memory: 0,

    startTime: Date.now(),

    monitor() {

        if (performance && performance.memory) {

            this.memory = Math.round(

                performance.memory.usedJSHeapSize / 1048576

            );

        }

    }

};

setInterval(() => {

    PerformanceEngine.monitor();

}, 10000);


// =======================================
// AUTO UNLOCK NEXT LESSON
// =======================================

function unlockNextMission() {

    for (let i = 1; i <= missions.length; i++) {

        if (

            localStorage.getItem(`lesson${i}Complete`) === "true"

        ) {

            localStorage.setItem(

                `lesson${i + 1}Unlocked`,

                "true"

            );

        }

    }

}


// =======================================
// ANALYTICS
// =======================================

const Analytics = {

    pageVisit: 0,

    lessonOpen: 0,

    quizCorrect: 0,

    quizWrong: 0

};

function saveAnalytics() {

    localStorage.setItem(

        "serverHeroAnalytics",

        JSON.stringify(Analytics)

    );

}

Analytics.pageVisit++;

saveAnalytics();


// =======================================
// ERROR HANDLER
// =======================================

window.onerror = function (

    message,

    source,

    line,

    column

) {

    console.error(

        "SERVER HERO ERROR",

        message,

        source,

        line,

        column

    );

    return false;

};


// =======================================
// MEMORY CLEANER
// =======================================

function cleanOldBackup() {

    const backup = JSON.parse(

        localStorage.getItem(

            "serverHeroBackup"

        )

    );

    if (!backup) return;

    const now = Date.now();

    const backupTime = new Date(

        backup.date

    ).getTime();

    const days =

        (now - backupTime) /

        (1000 * 60 * 60 * 24);

    if (days > 30) {

        localStorage.removeItem(

            "serverHeroBackup"

        );

    }

}

cleanOldBackup();


// =======================================
// AUTO SAVE LOOP
// =======================================

setInterval(() => {

    savePlayer();

    saveAchievements();

    saveStatistics();

    saveAnalytics();

}, 15000);


// =======================================
// INITIALIZATION
// =======================================

function initializeServerHero() {

    unlockNextMission();

    checkAchievements();

    checkMedals();

    updateDashboard();

}

initializeServerHero();


// =======================================
// VERSION INFO
// =======================================

const SERVER_HERO = {

    name: "SERVER HERO PREMIUM",

    version: "2.1",

    build: "2026.07",

    developer: "OpenAI + Nurul Farhana",

    status: "Production"

};

console.log("========================================");
console.log(SERVER_HERO.name);
console.log("Version :", SERVER_HERO.version);
console.log("Build   :", SERVER_HERO.build);
console.log("Status  :", SERVER_HERO.status);
console.log("========================================");
console.log("Dashboard Ready");
console.log("Mission Engine Ready");
console.log("Achievement Ready");
console.log("Statistics Ready");
console.log("Premium Engine Ready");
console.log("========================================");


// =======================================
// GLOBAL API
// =======================================

window.SERVER_HERO = SERVER_HERO;
window.PLAYER = PLAYER;
window.PerformanceEngine = PerformanceEngine;
window.Analytics = Analytics;

console.log("SERVER HERO PREMIUM V2.1 Loaded Successfully.");